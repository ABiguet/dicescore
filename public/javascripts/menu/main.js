document.addEventListener('DOMContentLoaded', function() {
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const newPlayerName = document.getElementById('newPlayerName');
    const playerList = document.getElementById('playerList');
    const newGameBtn = document.getElementById('newGameBtn');

    // Pré-remplir la liste si window.joueurs existe
    if (window.joueurs && Array.isArray(window.joueurs)) {
        window.joueurs.forEach(joueur => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center player-input';
            li.innerHTML = `
                ${joueur.name || joueur}
                <input type="color" name="playerColor" value="${joueur.color || '#ff0000'}">
                <button class="btn btn-danger btn-sm remove-player-btn">Supprimer</button>
            `;
            playerList.appendChild(li);
        });
    }

    function addPlayer() {
        const playerName = newPlayerName.value.trim();
        if (playerName) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center player-input';
            li.innerHTML = `
                ${playerName}
                <input type="color" name="playerColor" value="#ff0000">
                <button class="btn btn-danger btn-sm remove-player-btn">Supprimer</button>
            `;
            playerList.appendChild(li);
            newPlayerName.value = '';
        }
    }
    addPlayerBtn.addEventListener('click', addPlayer);

    newPlayerName.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addPlayer();
        }
    });

    // supprimer joueur de la liste
    playerList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-player-btn')) {
            const li = event.target.closest('li');
            if (li) li.remove();
        }
    });

    newGameBtn.addEventListener('click', function() {
        const players = [...document.querySelectorAll('.player-input')].map(li => {
            const name = li.childNodes[0].textContent.trim();
            const color = li.querySelector('input[type="color"]').value;
            return { name, color };
        }).filter(player => player.name);
        const mode = document.querySelector('input[name="gameType"]:checked').value;
        fetch('/init-game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ players, mode })
        }).then(res => {
            if (res.ok) window.location.href = '/game';
        });
    });
});
