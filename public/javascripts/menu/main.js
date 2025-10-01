import { PlayerList } from './playerList.js';
import { PlayerTable } from './playerTable.js';
import { GameStarter } from './gameStarter.js';

document.addEventListener("DOMContentLoaded", function () {
    // Initialisation des modules
    const playerList = new PlayerList(
        document.getElementById("playerList"),
        document.getElementById("newPlayerName"),
        document.getElementById("addPlayerBtn")
    );

    const playerTable = new PlayerTable(
        document.getElementById("playersTableBody")
    );

    const gameStarter = new GameStarter(
        document.getElementById("newGameBtn")
    );

    // Configuration des interactions entre modules
    gameStarter.setPlayerList(playerList);
    
    // Callback pour ajouter un joueur à la partie depuis le tableau
    playerTable.onPlayerAddToGame = (name, color) => {
        playerList.addPlayer(name, color);
    };

    // Gestion de la création de nouveaux joueurs
    const createPlayerBtn = document.getElementById("createPlayerBtn");
    createPlayerBtn.addEventListener("click", async function () {
        const newPlayerRow = document.getElementById("newPlayerRow");
        const playerName = newPlayerRow.querySelector('input[name="playerName"]').value.trim();
        const playerColor = newPlayerRow.querySelector('input[name="playerColor"]').value;
        
        if (!playerName) return;

        const player = await playerTable.createPlayer(playerName, playerColor);
        if (player) {
            // Reset les inputs
            newPlayerRow.querySelector('input[name="playerName"]').value = "";
            newPlayerRow.querySelector('input[name="playerColor"]').value = "#ff0000";
        }
    });
});
