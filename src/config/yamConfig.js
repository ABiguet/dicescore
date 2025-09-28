// yamConfig.js

const figures = [
  { label: "As", name: "as", zone: "sup" },
  { label: "Deux", name: "deux", zone: "sup" },
  { label: "Trois", name: "trois", zone: "sup" },
  { label: "Quatre", name: "quatre", zone: "sup" },
  { label: "Cinq", name: "cinq", zone: "sup" },
  { label: "Six", name: "six", zone: "sup" },
  { label: "<b>Total supérieur</b>", name: "totalSup", readonly: true, zone: "sup" },
  { label: "<b>Bonus (35 si ≥63)</b>", name: "bonus", readonly: true, zone: "sup" },
  { label: "Chance inf.", name: "chanceInf", zone: "inf" },
  { label: "Chance sup.", name: "chanceSup", zone: "inf" },
  { label: "Brelan", name: "brelan", zone: "inf" },
  { label: "Carré", name: "carre", zone: "inf" },
  { label: "Full (25)", name: "full", fixed: 25, zone: "inf" },
  { label: "Petite suite (30)", name: "petiteSuite", fixed: 30, zone: "inf" },
  { label: "Grande suite (40)", name: "grandeSuite", fixed: 40, zone: "inf" },
  { label: "Yams (50)", name: "yams", fixed: 50, zone: "inf" },
  { label: "<b>Total inférieur</b>", name: "totalInf", readonly: true, zone: "inf" },
  { label: "<b>Total général</b>", name: "total", readonly: true, zone: "inf" }
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