/* jshint esversion: 6 */

(function() {

const allAdventActions = [
    'DDR spielen',
    'Disco Fox tanzen',
    'Cha-cha-cha und Rumba tanzen',
    'Salsa tanzen',
    'Lobpreis singen',
    'Grittibänze backen',
    'Eis essen',
    'Spazieren gehen',
    'Gipfeli zum Frühstück',
    'Brot backen',
    'Eine Sorte Plätzchen backen',
    'Eine andere Sorte Plätzchen backen',
    'Schlittschuhlaufen',
    'PNG-Fotos von Moni anschauen',
    'Jogurt machen',
    'Dominion spielen',
    'Agricola spielen',
    'Kuchen backen',
    'Einen Nachtspaziergang machen',
    'Heiße Schoki trinken',
    'Fotos vom Adventskalender kleben',
    'Candle-Light-Dinner',
    'Weihnachtslieder singen',
    'Weihnachtslieder einstudieren',
];

const fixedActions = [6, 21];

function ensureOrder(a, s1, s2) {
    const i1 = a.indexOf(s1);
    const i2 = a.indexOf(s2);
    console.assert(i1 >= 0 && i2 >= 0);
    if (i1 > i2) {
        [a[i1], a[i2]] = [a[i2], a[i1]];
    }
}

function initAdvent() {
    let adventsActions = allAdventActions.slice();
    let rng = new Math.seedrandom();

    let remaining = adventsActions.length - fixedActions.length + 1;
    for (let i = 0; i < adventsActions.length; ++i) {
        if (fixedActions.indexOf(i + 1) != -1) continue;
        remaining -= 1;

        let swapElement = Math.floor(rng() * remaining);
        let swapIndex = i;
        console.assert(fixedActions.indexOf(swapIndex + 1) == -1);
        while (swapElement > 0) {
            swapElement -= 1;
            swapIndex += 1;
            while (fixedActions.indexOf(swapIndex + 1) != -1) {
                swapIndex += 1;
            }
        }
        [adventsActions[i], adventsActions[swapIndex]] = [adventsActions[swapIndex], adventsActions[i]];
    }

    // Some manual tweaks
    ensureOrder(adventsActions, 'Eine Sorte Plätzchen backen', 'Eine andere Sorte Plätzchen backen');
    ensureOrder(adventsActions, 'Weihnachtslieder einstudieren', 'Weihnachtslieder singen');

    return adventsActions;
}

function setAdventText() {
    const adventsActions = initAdvent();
    const dayInMillis = 24 * 60 * 60 * 1000;
    const dateFormat = { weekday: 'long', month: 'long', day: 'numeric' };

    const firstOfDecember = new Date(2017, 11, 1);
    const today = new Date();
    const day = (today - firstOfDecember) / dayInMillis;

    $('#advent-date').text(today.toLocaleString('de-CH', dateFormat));

    if (day >= 0 && day < adventsActions.length) {
        $('#advent-action').text(adventsActions[Math.floor(day)]);
    }
}

setAdventText();

})();
