// --- CONFIG ---
// Doit correspondre à la structure de figures dans yamConfig.js
const figures = [
  { name: 'as' }, { name: 'deux' }, { name: 'trois' }, { name: 'quatre' }, { name: 'cinq' }, { name: 'six' },
  { name: 'total_sup', readonly: true },
  { name: 'bonus', readonly: true },
  { name: 'chance_inf' }, { name: 'chance_sup' }, { name: 'brelan' }, { name: 'carre' },
  { name: 'full', fixed: 25 }, { name: 'petite_suite', fixed: 30 }, { name: 'grande_suite', fixed: 40 }, { name: 'yams', fixed: 50 },
  { name: 'total_inf', readonly: true },
  { name: 'total', readonly: true }
];

function getAllCells() {
  const inputs = document.querySelectorAll('input[name]');
  const cells = [];
  inputs.forEach(input => {
    // Supporte les noms à 3 ou 4 segments + optionnel _valide/_annule
    // Ex: fig_joueur_col ou fig_joueur_col1_col2[_valide]
    const match = input.name.match(/^([\w]+)_([a-z0-9éèêëàâîïôöùûüç-]+)_([0-9]+)_([0-9]+)(?:_(valide|annule))?$/i);
    if (match) {
      cells.push({
        fig: match[1],
        joueur: match[2],
        col: match[3] + '_' + match[4], // col = col1_col2
        type: match[5] || null,
        input
      });
    }
  });
  // DEBUG : log la structure détectée
  if (cells.length > 0) {
    const joueurs = [...new Set(cells.map(c => c.joueur))];
    const colonnes = [...new Set(cells.map(c => c.col))];
  }
  return cells;
}

function updateAll() {
  const allCells = getAllCells();
  const joueurs = [...new Set(allCells.map(c => c.joueur))];
  const colonnes = [...new Set(allCells.map(c => c.col))];
  joueurs.forEach(joueur => {
    colonnes.forEach(col => {
      updateOne(joueur, col, allCells);
    });
  });
}

function updateOne(joueur, col, allCells) {
  // Calculs Yam's pour une grille joueur/col (col = col1_col2)
  // 1. Supérieur
  let totalSup = 0;
  ['as', 'deux', 'trois', 'quatre', 'cinq', 'six'].forEach(fig => {
    const cell = allCells.find(c => c.fig === fig && c.joueur === joueur && c.col === col && !c.type);
    totalSup += cell ? (parseInt(cell.input.value) || 0) : 0;
  });
  setValue(`total_sup_${joueur}_${col}`, totalSup);

  // 2. Bonus
  setValue(`bonus_${joueur}_${col}`, totalSup >= 63 ? 35 : 0);

  // 3. Inférieur
  let totalInf = 0;
  // Chance inf/sup
  let chanceInfCell = allCells.find(c => c.fig === 'chance_inf' && c.joueur === joueur && c.col === col && !c.type);
  let chanceSupCell = allCells.find(c => c.fig === 'chance_sup' && c.joueur === joueur && c.col === col && !c.type);
  let chanceInf = chanceInfCell && chanceInfCell.input.value !== '' ? parseInt(chanceInfCell.input.value) : null;
  let chanceSup = chanceSupCell && chanceSupCell.input.value !== '' ? parseInt(chanceSupCell.input.value) : null;
  if (chanceInf !== null && chanceSup !== null && chanceSup < chanceInf) {
    if (chanceInfCell) chanceInfCell.input.classList.add('is-invalid');
    if (chanceSupCell) chanceSupCell.input.classList.add('is-invalid');
  } else {
    if (chanceInfCell) chanceInfCell.input.classList.remove('is-invalid');
    if (chanceSupCell) chanceSupCell.input.classList.remove('is-invalid');
    if (chanceInf !== null) totalInf += chanceInf;
    if (chanceSup !== null) totalInf += chanceSup;
  }
  // Brelan, carré
  ['brelan', 'carre'].forEach(fig => {
    const cell = allCells.find(c => c.fig === fig && c.joueur === joueur && c.col === col && !c.type);
    totalInf += cell ? (parseInt(cell.input.value) || 0) : 0;
  });
  // Figures fixes (cases à cocher)
  [['full', 25], ['petite_suite', 30], ['grande_suite', 40], ['yams', 50]].forEach(([fig, points]) => {
    const cbValide = allCells.find(c => c.fig === fig && c.joueur === joueur && c.col === col && c.type === 'valide');
    if (cbValide && cbValide.input.checked) totalInf += points;
  });
  setValue(`total_inf_${joueur}_${col}`, totalInf);

  // 4. Total général
  const bonus = totalSup >= 63 ? 35 : 0;
  setValue(`total_${joueur}_${col}`, totalSup + bonus + totalInf);
}

function setValue(name, value) {
  const input = document.getElementsByName(name)[0];
  if (input) input.value = value;
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('[Yams] DOMContentLoaded');
  function bindListeners() {
    const allCells = getAllCells();
    allCells.forEach(cell => {
      // On évite de binder plusieurs fois
      if (!cell.input._yamListenerBound) {
        if (!cell.input.readOnly && cell.input.type === 'number') {
          cell.input.addEventListener('input', updateAll);
        }
        if (cell.input.type === 'checkbox') {
          cell.input.addEventListener('change', function() {
            // Exclusivité des cases à cocher (valide/annule)
            const allCellsNow = getAllCells();
            if (cell.type === 'valide' || cell.type === 'annule') {
              const otherType = cell.type === 'valide' ? 'annule' : 'valide';
              const other = allCellsNow.find(c => c.fig === cell.fig && c.joueur === cell.joueur && c.col === cell.col && c.type === otherType);
              if (cell.input.checked && other) other.input.checked = false;
              // On ne coche plus automatiquement l'autre case si on décoche
            }
            updateAll();
          });
        }
        cell.input._yamListenerBound = true;
      }
    });
  }
  bindListeners();
  updateAll();
  // Vérification supplémentaire : combien d'inputs détectés ?
  const allCells = getAllCells();
});
// figures et figures fixes doivent correspondre à ta config côté serveur