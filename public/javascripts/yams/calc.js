// yams/calc.js
import { state, saveState } from "./state.js";
import {
    getFigures,
    getFiguresSup,
    getFiguresInf,
    getFiguresFixes,
    getFigureMultiple,
} from "./config.js";
import { setInputValue } from "./ui.js";

export function recalcAll() {
    const figures = getFigures();
    const figuresSup = getFiguresSup();
    const figuresInf = getFiguresInf();
    const figuresFixes = getFiguresFixes();
    let totalTurbo = 0;
    for (const playerId in state) {
        totalTurbo = 0;
        for (const col in state[playerId]) {
            // Total supérieur
            const totalSup = figuresSup.reduce(
                (sum, fig) => sum + (parseInt(state[playerId][col][fig]) || 0),
                0
            );
            setInputValue(`totalSup_${playerId}_${col}`, totalSup);

            // Bonus
            const bonus = totalSup >= 63 ? 35 : 0;
            setInputValue(`bonus_${playerId}_${col}`, bonus);

            // Total inférieur
            const totalInf = figuresInf.reduce((sum, fig) => {
                if (figuresFixes.includes(fig)) {
                    return (
                        sum +
                        (state[playerId][col][`${fig}_valide`]
                            ? parseInt(
                                  figures.find((f) => f.name === fig).fixed
                              )
                            : 0)
                    );
                }
                return sum + (parseInt(state[playerId][col][fig]) || 0);
            }, 0);
            setInputValue(`totalInf_${playerId}_${col}`, totalInf);

            // Total général
            const total = totalSup + bonus + totalInf;
            setInputValue(`total_${playerId}_${col}`, total);

            totalTurbo += total;
        }
        setInputValue(`total_joueur_${playerId}_global`, totalTurbo);
    }
    saveState();
}
