// yams/state.js

export const state = {};

export function loadState() {
    const saved = localStorage.getItem("yamState");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(state, parsed);
        } catch (e) {
            // Si localStorage corrompu, on reset
            localStorage.removeItem("yamState");
        }
    }
}

export function saveState() {
    localStorage.setItem("yamState", JSON.stringify(state));
}

export function resetState() {
    for (const playerId in state) {
        for (const col in state[playerId]) {
            for (const key in state[playerId][col]) {
                state[playerId][col][key] = "";
            }
        }
    }
    saveState();
}
