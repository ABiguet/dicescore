
const figures = ['as', 'deux', 'trois', 'quatre', 'cinq', 'six'];
const figuresInf = ['chance_inf', 'chance_sup', 'brelan', 'carre', 'full', 'petite_suite', 'grande_suite', 'yams'];


function updateTotal(joueur) {
  // Total supérieur
  let totalSup = 0;
  figures.forEach(fig => {
    totalSup += parseInt(document.getElementsByName(fig + '_' + joueur)[0].value) || 0;
  });
  document.getElementsByName('total_sup_' + joueur)[0].value = totalSup;
  // Bonus
  document.getElementsByName('bonus_' + joueur)[0].value = totalSup >= 63 ? 35 : 0;

  // Total inférieur
  let totalInf = 0;
  // Chance inférieure et supérieure : ne jamais modifier la saisie utilisateur
  let chanceInfInput = document.getElementsByName('chance_inf_' + joueur)[0];
  let chanceSupInput = document.getElementsByName('chance_sup_' + joueur)[0];
  let chanceInf = chanceInfInput.value === '' ? null : parseInt(chanceInfInput.value);
  let chanceSup = chanceSupInput.value === '' ? null : parseInt(chanceSupInput.value);
  // Si les deux champs sont remplis et que l'ordre n'est pas respecté, warning visuel et pas d'addition
  if (chanceInf !== null && chanceSup !== null && chanceSup < chanceInf) {
    chanceInfInput.classList.add('is-invalid');
    chanceSupInput.classList.add('is-invalid');
    // On n'additionne rien
  } else {
    chanceInfInput.classList.remove('is-invalid');
    chanceSupInput.classList.remove('is-invalid');
    if (chanceInf !== null) totalInf += chanceInf;
    if (chanceSup !== null) totalInf += chanceSup;
  }
  // Figures à points fixes : full, petite suite, grande suite, yams (deux cases à cocher exclusives)
  function getFixedFigureValue(fig, joueur, points) {
    const checked = document.getElementById(fig + '_' + joueur + '_valide').checked;
    return checked ? points : 0;
  }
  totalInf += getFixedFigureValue('full', joueur, 25);
  totalInf += getFixedFigureValue('petite_suite', joueur, 30);
  totalInf += getFixedFigureValue('grande_suite', joueur, 40);
  totalInf += getFixedFigureValue('yams', joueur, 50);
  // Les autres (brelan, carre) restent des inputs numériques
  ['brelan', 'carre'].forEach(fig => {
    totalInf += parseInt(document.getElementsByName(fig + '_' + joueur)[0].value) || 0;
  });
  document.getElementsByName('total_inf_' + joueur)[0].value = totalInf;

  // Total général
  let totalGen = totalSup + (totalSup >= 63 ? 35 : 0) + totalInf;
  document.getElementsByName('total_' + joueur)[0].value = totalGen;
}


document.addEventListener('DOMContentLoaded', function() {
  ['j1', 'j2'].forEach(joueur => {
    // Supérieur
    figures.forEach(fig => {
      document.getElementsByName(fig + '_' + joueur)[0].addEventListener('input', function() {
        updateTotal(joueur);
      });
    });
    // Inférieur
    figuresInf.forEach(fig => {
      // Pour les cases à cocher exclusives (full, petite_suite, grande_suite, yams)
      if (["full","petite_suite","grande_suite","yams"].includes(fig)) {
        const cbValideJ = document.getElementById(fig + '_' + joueur + '_valide');
        const cbAnnuleJ = document.getElementById(fig + '_' + joueur + '_annule');
        // Exclusivité : quand on coche l'une, on décoche l'autre
        cbValideJ.addEventListener('change', function() {
          if (cbValideJ.checked) cbAnnuleJ.checked = false;
          if (!cbValideJ.checked && !cbAnnuleJ.checked) cbAnnuleJ.checked = true;
          updateTotal(joueur);
        });
        cbAnnuleJ.addEventListener('change', function() {
          if (cbAnnuleJ.checked) cbValideJ.checked = false;
          if (!cbAnnuleJ.checked && !cbValideJ.checked) cbValideJ.checked = true;
          updateTotal(joueur);
        });
      } else {
        document.getElementsByName(fig + '_' + joueur)[0].addEventListener('input', function() {
          updateTotal(joueur);
        });
      }
    });
  });
});
