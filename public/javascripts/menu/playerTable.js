// Gestion du tableau des joueurs en base de données
export class PlayerTable {
    constructor(tableBodyElement) {
        this.tableBodyElement = tableBodyElement;
        this.init();
    }

    init() {
        this.tableBodyElement.addEventListener("click", (e) => {
            // Ajouter un joueur à la partie
            const addBtn = e.target.closest(".add-player-to-game-btn");
            if (addBtn) {
                const tr = addBtn.closest("tr");
                const playerName = tr.querySelector("[data-player-name]").dataset.playerName;
                const playerColor = tr.querySelector('input[type="color"]').value;
                this.onPlayerAddToGame?.(playerName, playerColor);
            }

            // Supprimer un joueur de la base
            const deleteBtn = e.target.closest(".delete-player-btn");
            if (deleteBtn) {
                const playerId = deleteBtn.dataset.playerId;
                const playerName = deleteBtn.closest("tr").querySelector("[data-player-name]").textContent;
                
                if (confirm(`Êtes-vous sûr de vouloir supprimer le joueur "${playerName}" ?`)) {
                    this.deletePlayer(playerId, deleteBtn.closest("tr"));
                }
            }
        });
    }

    async createPlayer(name, color) {
        try {
            const res = await fetch("/api/players", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, color }),
            });
            
            if (res.ok) {
                const player = await res.json();
                this.addPlayerRow(player);
                return player;
            } else {
                throw new Error("Erreur lors de la création du joueur");
            }
        } catch (error) {
            console.error("Erreur lors de la création :", error);
            alert("Erreur lors de la création du joueur");
        }
    }

    async deletePlayer(playerId, tr) {
        try {
            const res = await fetch(`/api/players/${playerId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            
            if (res.ok) {
                tr.remove();
                console.log(`Joueur ${playerId} supprimé avec succès`);
            } else {
                alert("Erreur lors de la suppression du joueur");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            alert("Erreur lors de la suppression du joueur");
        }
    }

    addPlayerRow(player) {
        const newPlayerRow = document.getElementById("newPlayerRow");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><a href="#" class="add-player-to-game-btn text-green"><i class="bi bi-plus-circle"></i></a></td>
            <td data-player-name="${player.name}">${player.name}</td>
            <td><input type="color" name="player-color" value="${player.color}"></td>
            <td><button class="btn btn-danger btn-sm delete-player-btn" data-player-id="${player.id}">Supprimer</button></td>
        `;
        this.tableBodyElement.insertBefore(tr, newPlayerRow);
    }

    // Callback pour ajouter un joueur à la partie
    onPlayerAddToGame = null;
}