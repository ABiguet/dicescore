document.addEventListener("DOMContentLoaded", function () {
    const addPlayerBtn = document.getElementById("addPlayerBtn");
    const newPlayerName = document.getElementById("newPlayerName");
    const playerList = document.getElementById("playerList");
    const newGameBtn = document.getElementById("newGameBtn");

    function createPlayerElement(name, color = "#ff0000") {
        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center player-input";
        li.innerHTML = `
            <span class="player-name">${name}</span>
            <input type="color" name="playerColor" value="${color}">
            <button class="btn btn-danger btn-sm remove-player-btn">Supprimer</button>
        `;
        return li;
    }

    function addPlayer(name, color) {
        if (!name) return;
        playerList.appendChild(createPlayerElement(name, color));
        newPlayerName.value = "";
    }

    // Pré-remplir la liste si window.joueurs existe
    if (window.joueurs && Array.isArray(window.joueurs)) {
        window.joueurs.forEach((joueur) => {
            addPlayer(joueur.name || joueur, joueur.color || "#ff0000");
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
});
