// yams/ui.js
import { state } from "./state.js";

export function syncInputWithState(input, direction = "toState") {
    const parts = input.name.split("_");
    const figure = parts[0];
    const playerId = parts[1];
    const col = parts[2];
    const type = parts[3] || null;
    if (!state[playerId]) state[playerId] = {};
    if (!state[playerId][col]) state[playerId][col] = {};
    if (direction === "toState") {
        if (type) {
            state[playerId][col][`${figure}_${type}`] = input.checked;
        } else {
            state[playerId][col][figure] = input.value;
        }
    } else if (direction === "toInput") {
        if (type) {
            input.checked = !!state[playerId][col][`${figure}_${type}`];
        } else {
            input.value = state[playerId][col][figure] || "";
        }
    }
}

export function setInputValue(name, value) {
    const input = document.getElementsByName(name)[0];
    if (input) input.value = value;
}
