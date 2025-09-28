// yamConfig.js

const figures = [
  { label: "As", name: "as" },
  { label: "Deux", name: "deux" },
  { label: "Trois", name: "trois" },
  { label: "Quatre", name: "quatre" },
  { label: "Cinq", name: "cinq" },
  { label: "Six", name: "six" },
  { label: "<b>Total supérieur</b>", name: "total_sup", readonly: true },
  { label: "<b>Bonus (35 si ≥63)</b>", name: "bonus", readonly: true },
  { label: "Chance inf.", name: "chance_inf" },
  { label: "Chance sup.", name: "chance_sup" },
  { label: "Brelan", name: "brelan" },
  { label: "Carré", name: "carre" },
  { label: "Full (25)", name: "full", fixed: 25 },
  { label: "Petite suite (30)", name: "petite_suite", fixed: 30 },
  { label: "Grande suite (40)", name: "grande_suite", fixed: 40 },
  { label: "Yams (50)", name: "yams", fixed: 50 },
  { label: "<b>Total inférieur</b>", name: "total_inf", readonly: true },
  { label: "<b>Total général</b>", name: "total", readonly: true }
];

const modes = {
  classic: {
    name: "Classique",
    columns: [{ label: "" }]
  },
  turbo: {
    name: "Turbo",
    columns: [
      { label: "Descendante" },
      { label: "Montante" },
      { label: "Libre" }
    ]
  }
};

export default { figures, modes };