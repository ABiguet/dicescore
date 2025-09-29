document.addEventListener('DOMContentLoaded', function() {
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const newPlayerName = document.getElementById('newPlayerName');
    const playerList = document.getElementById('playerList');
    const newGameBtn = document.getElementById('newGameBtn');

    addPlayerBtn.addEventListener('click', function() {
        const playerName = newPlayerName.value.trim();
        if (playerName) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center player-input';
            li.innerHTML = `
                ${playerName}
                <button class="btn btn-danger btn-sm remove-player-btn">Supprimer</button>
            `;
            playerList.appendChild(li);
            newPlayerName.value = '';
        }
    }); 
    newGameBtn.addEventListener('click', function() {
        const players = [...document.querySelectorAll('.player-input')].map(li => li.firstChild.textContent.trim()).filter(Boolean);
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
