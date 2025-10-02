// yamConfig.js

const figures = [
  { label: 'As', name: 'as', zone: 'sup', multiple: 1 },
  { label: 'Deux', name: 'deux', zone: 'sup', multiple: 2 },
  { label: 'Trois', name: 'trois', zone: 'sup', multiple: 3 },
  { label: 'Quatre', name: 'quatre', zone: 'sup', multiple: 4 },
  { label: 'Cinq', name: 'cinq', zone: 'sup', multiple: 5 },
  { label: 'Six', name: 'six', zone: 'sup', multiple: 6 },
  { label: '<b>Total supérieur</b>', name: 'totalSup', readonly: true, zone: 'sup' },
  { label: '<b>Bonus (35 si ≥63)</b>', name: 'bonus', readonly: true, zone: 'sup' },
  { label: 'Chance inf.', name: 'chanceInf', zone: 'inf' },
  { label: 'Chance sup.', name: 'chanceSup', zone: 'inf' },
  { label: 'Brelan', name: 'brelan', zone: 'inf' },
  { label: 'Carré', name: 'carre', zone: 'inf' },
  { label: 'Full (25)', name: 'full', fixed: 25, zone: 'inf' },
  { label: 'Petite suite (30)', name: 'petiteSuite', fixed: 30, zone: 'inf' },
  { label: 'Grande suite (40)', name: 'grandeSuite', fixed: 40, zone: 'inf' },
  { label: 'Yams (50)', name: 'yams', fixed: 50, zone: 'inf' },
  { label: '<b>Total inférieur</b>', name: 'totalInf', readonly: true, zone: 'inf' },
  { label: '<b>Total général</b>', name: 'total', readonly: true, zone: 'inf' },
];

const modes = {
  classic: { name: 'Classique', columns: [{ label: '' }], key: 'classic' },
  turbo: {
    name: 'Turbo',
    columns: [
      { label: '<i class="bi bi-arrow-down"></i>' },
      { label: '<i class="bi bi-arrow-up"></i>' },
      { label: '<i class="bi bi-arrow-down-up"></i>' },
    ],
    key: 'turbo',
  },
};

export default { figures, modes };
