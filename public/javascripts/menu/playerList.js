// Gestion de la liste des joueurs pour la partie
export class PlayerList {
    constructor(listElement, newPlayerInput, addButton) {
        this.listElement = listElement;
        this.newPlayerInput = newPlayerInput;
        this.addButton = addButton;
        this.init();
    }

    init() {
        this.addButton.addEventListener("click", () => {
            this.addPlayer(this.newPlayerInput.value.trim());
        });

        this.newPlayerInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                this.addPlayer(this.newPlayerInput.value.trim());
            }
        });

        // Suppression d'un joueur (event delegation)
        this.listElement.addEventListener("click", (e) => {
            if (e.target.classList.contains("remove-player-btn")) {
                e.target.closest("li").remove();
            }
        });

        // Pré-remplir la liste si window.players existe
        if (window.players && Array.isArray(window.players)) {
            window.players.forEach((player) => {
                this.addPlayer(player.name || player, player.color || "#ff0000");
            });
        }
    }

    createPlayerElement(name, color = "#ff0000") {
        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center player-input";
        li.innerHTML = `
            <span class="player-name">${name}</span>
            <input type="color" name="player-color" value="${color}">
            <button class="btn btn-danger btn-sm remove-player-btn">Supprimer</button>
        `;
        return li;
    }

    addPlayer(name, color = "#ff0000") {
        if (!name) return;
        this.listElement.appendChild(this.createPlayerElement(name, color));
        this.newPlayerInput.value = "";
    }

    getPlayers() {
        return [...this.listElement.querySelectorAll(".player-input")]
            .map((li) => {
                const name = li.querySelector(".player-name").textContent.trim();
                const color = li.querySelector('input[type="color"]').value;
                return { name, color };
            })
            .filter((player) => player.name);
    }
}