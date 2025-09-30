import { state, loadState, resetState } from "./state.js";
import { syncInputWithState } from "./ui.js";
import { recalcAll } from "./calc.js";
import { getFigureMultiple } from "./config.js";

document.addEventListener("DOMContentLoaded", function () {
    loadState();
    const inputs = document.querySelectorAll("input[name]");

    // Restaure l'UI depuis l'état (localStorage ou vide)
    inputs.forEach((input) => syncInputWithState(input, "toInput"));

    // Ajoute l'écouteur DRY sur chaque input
    inputs.forEach((input) => {
        input.addEventListener(
            input.type === "checkbox" ? "change" : "input",
            handler
        );
    });

    function handler(event) {
        syncInputWithState(event.target, "toState");
        recalcAll();
    }

    // Bouton de reset
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            if (!confirm("Confirmer le reset ? Cette action est irréversible."))
                return;
            resetState();
            inputs.forEach((input) => syncInputWithState(input, "toInput"));
            recalcAll();
        });
    }

    // Handler pour le bouton increment
    document.querySelectorAll('.increment-btn').forEach(btn => {
        btn.addEventListener('click', function(event) {
            const input = event.currentTarget.closest('.input-group').querySelector('input');
            const multiple = getFigureMultiple(input);
            const currentValue = Number(input.value) || 0;
            if (currentValue + multiple > (multiple * 5)) {
                input.value = multiple * 5;
            } else {
                input.value = currentValue + multiple;
            }
            syncInputWithState(input, "toState");
            recalcAll();
        });
    });

    // Handler pour le bouton decrement
    document.querySelectorAll('.decrement-btn').forEach(btn => {
        btn.addEventListener('click', function(event) {
            const input = event.currentTarget.closest('.input-group').querySelector('input');
            const multiple = getFigureMultiple(input);
            const currentValue = Number(input.value) || 0;
            input.value = Math.max(0, currentValue - multiple);
            syncInputWithState(input, "toState");
            recalcAll(); 
        });
    });

    // Recalcule tout à l'initialisation (pour afficher les totaux corrects)
    recalcAll();
});
