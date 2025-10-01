// Gestion du démarrage de partie
export class GameStarter {
    constructor(newGameButton) {
        this.newGameButton = newGameButton;
        this.playerList = null;
        this.init();
    }

    init() {
        this.newGameButton.addEventListener("click", () => {
            this.startGame();
        });
    }

    setPlayerList(playerList) {
        this.playerList = playerList;
    }

    async startGame() {
        if (!this.playerList) {
            console.error("PlayerList non configurée");
            return;
        }

        const players = this.playerList.getPlayers();
        const mode = document.querySelector('input[name="gameType"]:checked').value;

        try {
            const res = await fetch("/init-game", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ players, mode }),
            });

            if (res.ok) {
                window.location.href = "/game";
            } else {
                alert("Erreur lors du démarrage de la partie");
            }
        } catch (error) {
            console.error("Erreur lors du démarrage :", error);
            alert("Erreur lors du démarrage de la partie");
        }
    }
}