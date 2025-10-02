// Fichier menu.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Menu JS chargé !');
    
    const tablePlayersBody = document.getElementById('playersTableBody');
    const playersList = document.getElementById('playerList');

    tablePlayersBody.addEventListener('click', function(e) {
      if (e.target.closest('.add-player-to-game-btn')) {
        const btn = e.target.closest('.add-player-to-game-btn');
        const playerId = btn.dataset.playerId;
        const playerName = btn.dataset.playerName;
        const playerColor = btn.dataset.playerColor;
        console.log(`Ajouter le joueur ${playerName} (ID: ${playerId}, Couleur: ${playerColor}) à la partie.`);
        addPlayerToGame(playerId, playerName, playerColor);
      }
    });

    playersList.addEventListener('click', function(e) {
      if (e.target.closest('.remove-player-btn')) {
        const btn = e.target.closest('.remove-player-btn');
        const playerId = btn.dataset.playerId;
        console.log(`Supprimer le joueur (ID: ${playerId}) de la partie.`);
        removePlayerFromGame(playerId);
      }
    });

    async function addPlayerToGame(playerId, playerName, playerColor) {
      const response = await fetch('/add-player-to-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ player: { id: playerId, name: playerName, color: playerColor } })
      });
      if (response.ok) {
        console.log(`Joueur ${playerName} ajouté à la partie.`);
        const playerElement = createPlayerElement(playerId, playerName, playerColor);
        playersList.appendChild(playerElement);
      } else {
        console.error(`Erreur lors de l'ajout du joueur ${playerName}.`);
      }
    }

    async function removePlayerFromGame(playerId) {
      const response = await fetch(`/remove-player-from-game/${playerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });  
      if (response.ok) {
        console.log(`Joueur (ID: ${playerId}) supprimé de la partie.`);
        const playerItem = playersList.querySelector(`li[data-player-id="${playerId}"]`);
        if (playerItem) {
          playerItem.remove();
        }
      } else {
        console.error(`Erreur lors de la suppression du joueur (ID: ${playerId}).`);
      }
    }

    function createPlayerElement(id, name, color = '#ff0000') {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center player-input';
      li.dataset.playerId = id;
      li.dataset.playerName = name;
      li.innerHTML = `
              <span class="player-name">${name}</span>
              <input type="color" name="player-color" value="${color}">
              <button class="btn btn-danger btn-sm remove-player-btn" data-player-id="${id}">Supprimer</button>
          `;
      return li;
    }
});