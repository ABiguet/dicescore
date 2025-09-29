// config.js
// Extrait dynamiquement les listes de figures à partir de window.yamFigures

export function getFigures() {
    if (!window.yamFigures) throw new Error("yamFigures config not found");
    return window.yamFigures;
}

export function getFiguresSup() {
    return getFigures()
        .filter((f) => f.zone === "sup" && !f.readonly)
        .map((f) => f.name);
}

export function getFiguresInf() {
    return getFigures()
        .filter((f) => f.zone === "inf" && !f.readonly)
        .map((f) => f.name);
}

export function getFiguresFixes() {
    return getFigures()
        .filter((f) => f.fixed)
        .map((f) => f.name);
}
