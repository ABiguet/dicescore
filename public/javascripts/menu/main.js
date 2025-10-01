document.addEventListener("DOMContentLoaded", function () {
    const addPlayerBtn = document.getElementById("addPlayerBtn");
    const newPlayerName = document.getElementById("newPlayerName");
    const playerList = document.getElementById("playerList");
    const newGameBtn = document.getElementById("newGameBtn");
    const createPlayerBtn = document.getElementById("createPlayerBtn");

    function createPlayerElement(name, color = "#ff0000") {
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

    function addPlayer(name, color) {
        if (!name) return;
        playerList.appendChild(createPlayerElement(name, color));
        newPlayerName.value = "";
    }

    // Pré-remplir la liste si window.players existe
    if (window.players && Array.isArray(window.players)) {
        window.players.forEach((player) => {
            addPlayer(player.name || player, player.color || "#ff0000");
        });
    }

    addPlayerBtn.addEventListener("click", function () {
        addPlayer(newPlayerName.value.trim());
    });

    newPlayerName.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addPlayer(newPlayerName.value.trim());
        }
    });

    // Suppression d'un joueur (event delegation)
    playerList.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-player-btn")) {
            e.target.closest("li").remove();
        }
    });

    newGameBtn.addEventListener("click", function () {
        const players = [...playerList.querySelectorAll(".player-input")]
            .map((li) => {
                const name = li
                    .querySelector(".player-name")
                    .textContent.trim();
                const color = li.querySelector('input[type="color"]').value;
                return { name, color };
            })
            .filter((player) => player.name);
        const mode = document.querySelector(
            'input[name="gameType"]:checked'
        ).value;
        fetch("/init-game", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ players, mode }),
        }).then((res) => {
            if (res.ok) window.location.href = "/game";
        });
    });

    createPlayerBtn.addEventListener("click", async function () {
        const newPlayerRow = document.getElementById("newPlayerRow");
        const playerName = newPlayerRow.querySelector('input[name="playerName"]').value.trim();
        const playerColor = newPlayerRow.querySelector('input[name="playerColor"]').value;
        if (!playerName) return;

        // Envoi AJAX vers l'API Express
        const res = await fetch("/api/players", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: playerName, color: playerColor }),
        });
        if (res.ok) {
            const player = await res.json();
            // Ajoute la ligne dans le tableau HTML
            const tbody = document.getElementById("playersTableBody");
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><a href="#" class="add-player-to-game-btn text-green"><i class="bi bi-plus-circle"></i></a></td>
                <td data-player-name="${player.name}">${player.name}</td>
                <td><input type="color" name="player-color" value="${player.color}"></td>
                <td></td>
            `;
            tbody.insertBefore(tr, newPlayerRow);
            // Optionnel : reset les inputs
            newPlayerRow.querySelector('input[name="playerName"]').value = "";
            newPlayerRow.querySelector('input[name="playerColor"]').value = "#ff0000";
        }
    });
    document.getElementById("playersTableBody").addEventListener("click", function (e) {
        // Cherche le bouton même si on clique sur l'icône à l'intérieur
        const btn = e.target.closest(".add-player-to-game-btn");
        if (btn) {
            const tr = btn.closest("tr");
            const playerName = tr.querySelector("[data-player-name]").dataset.playerName;
            const playerColor = tr.querySelector('input[type="color"]').value;
            addPlayer(playerName, playerColor);
        }
    });
});
