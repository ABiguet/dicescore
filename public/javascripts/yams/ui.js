// yams/ui.js

// Import de l'objet "state" qui contient l'état global de l'application
// Cet objet stocke tous les scores et données de la partie en cours
import { state } from './state.js';

/**
 * Fonction centrale pour synchroniser les données entre le DOM (interface) et l'état JS
 * Cette fonction applique le principe DRY (Don't Repeat Yourself)
 *
 * @param {HTMLInputElement} input - L'élément input HTML (champ de saisie ou checkbox)
 * @param {string} direction - Direction de la synchronisation :
 *   - "toState" : met à jour l'état depuis la valeur de l'input (saisie utilisateur)
 *   - "toInput" : met à jour l'input depuis l'état (restauration depuis localStorage)
 */
export function syncInputWithState(input, direction = 'toState') {
  // Découpage du nom de l'input pour extraire les informations
  // Exemple : "as_player1_descendante_valide" devient ["as", "player1", "descendante", "valide"]
  const parts = input.name.split('_');
  const figure = parts[0]; // Ex: "as", "brelan", "totalSup"
  const playerId = parts[1]; // Ex: "player1", "player2"
  const col = parts[2]; // Ex: "descendante", "montante", "libre"
  const type = parts[3] || null; // Ex: "valide", "annule" (pour les checkboxes), ou null

  // Initialisation de la structure de données si elle n'existe pas encore
  // Cela évite les erreurs "Cannot read property of undefined"
  if (!state[playerId]) state[playerId] = {}; // Crée l'objet joueur
  if (!state[playerId][col]) state[playerId][col] = {}; // Crée l'objet colonne

  if (direction === 'toState') {
    // SENS : DOM → État (quand l'utilisateur saisit quelque chose)
    if (type) {
      // Pour les checkboxes (ex: case "Yams valide" cochée/décochée)
      // On stocke true/false selon si la case est cochée
      state[playerId][col][`${figure}_${type}`] = input.checked;
    } else {
      // Pour les inputs texte/nombre (ex: score "Brelan" = 15)
      // On stocke la valeur saisie par l'utilisateur
      state[playerId][col][figure] = input.value;
    }
  } else if (direction === 'toInput') {
    // SENS : État → DOM (quand on restaure depuis localStorage ou calcule)
    if (type) {
      // Pour les checkboxes : on met à jour l'état "coché/décoché"
      // Le !! force la conversion en booléen (true/false)
      input.checked = !!state[playerId][col][`${figure}_${type}`];
    } else {
      // Pour les inputs : on remet la valeur stockée (ou "" si vide)
      input.value = state[playerId][col][figure] || '';
    }
  }
}

/**
 * Fonction utilitaire pour définir la valeur d'un input par son nom
 * Utilisée principalement pour afficher les totaux calculés
 *
 * @param {string} name - Le nom de l'input à modifier (ex: "total_player1_descendante")
 * @param {string|number} value - La valeur à assigner à l'input
 */
export function setInputValue(name, value) {
  // Recherche le premier input ayant ce nom dans tout le document
  const input = document.getElementsByName(name)[0];

  // Si l'input existe, on lui assigne la valeur
  // Cette vérification évite les erreurs si l'input n'est pas trouvé
  if (input) input.value = value;
}
