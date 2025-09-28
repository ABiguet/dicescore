document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('input[name]');
  const state = {};
  const saved = localStorage.getItem('yamState');
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.assign(state, parsed);
  }
  const figures = window.yamFigures;

  // Figures dynamiques depuis la config
  const figuresSup = figures.filter(f => f.zone === 'sup' && !f.readonly).map(f => f.name);
  const figuresInf = figures.filter(f => f.zone === 'inf' && !f.readonly).map(f => f.name);
  const figuresFixes = figures.filter(f => f.fixed).map(f => f.name);

  // Restaure l'UI depuis l'état (localStorage ou vide)
  inputs.forEach(input => syncInputWithState(input, 'toInput'));

  // Ajoute l'écouteur DRY sur chaque input
  inputs.forEach(input => {
    input.addEventListener(input.type === "checkbox" ? 'change' : 'input', handler);
  });

  function handler(event) {
    syncInputWithState(event.target, 'toState');
    recalcAll();
  }

  function recalcAll() {
    for (const playerId in state) {
      for (const col in state[playerId]) {
        // Total supérieur
        const totalSup = figuresSup.reduce((sum, fig) => sum + (parseInt(state[playerId][col][fig]) || 0), 0);
        setInputValue(`totalSup_${playerId}_${col}`, totalSup);

        // Bonus
        const bonus = totalSup >= 63 ? 35 : 0;
        setInputValue(`bonus_${playerId}_${col}`, bonus);

        // Total inférieur
        const totalInf = figuresInf.reduce((sum, fig) => {
          if (figuresFixes.includes(fig)) {
            return sum + (state[playerId][col][`${fig}_valide`] ? parseInt(figures.find(f => f.name === fig).fixed) : 0);
          }
          return sum + (parseInt(state[playerId][col][fig]) || 0);
        }, 0);
        setInputValue(`totalInf_${playerId}_${col}`, totalInf);

        // Total général
        const total = totalSup + bonus + totalInf;
        setInputValue(`total_${playerId}_${col}`, total);
      }
    }
    localStorage.setItem('yamState', JSON.stringify(state));
  }

  function setInputValue(name, value) {
    const input = document.getElementsByName(name)[0];
    if (input) input.value = value;
  }

  // Fonction unique DRY pour synchroniser état <-> DOM
  function syncInputWithState(input, direction = 'toState') {
    const parts = input.name.split('_');
    const figure = parts[0];
    const playerId = parts[1];
    const col = parts[2];
    const type = parts[3] || null;
    if (!state[playerId]) state[playerId] = {};
    if (!state[playerId][col]) state[playerId][col] = {};
    if (direction === 'toState') {
      if (type) {
        state[playerId][col][`${figure}_${type}`] = input.checked;
      } else {
        state[playerId][col][figure] = input.value;
      }
    } else if (direction === 'toInput') {
      if (type) {
        input.checked = !!state[playerId][col][`${figure}_${type}`];
      } else {
        input.value = state[playerId][col][figure] || '';
      }
    }
  }
  // Bouton de reset
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      // Vider l'objet state
      for (const playerId in state) {
        for (const col in state[playerId]) {
          for (const key in state[playerId][col]) {
            state[playerId][col][key] = '';
          }
        }
      }
      // Mettre à jour tous les inputs
      inputs.forEach(input => syncInputWithState(input, 'toInput'));
      // Supprimer le localStorage
      localStorage.removeItem('yamState');
      // Recalculer les totaux
      recalcAll();
    });
  }
  // Recalcule tout à l'initialisation (pour afficher les totaux corrects)
  recalcAll();
});