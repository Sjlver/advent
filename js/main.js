/* jshint esversion: 6 */

(function() {

const allAdventActions = [
    'Plätzchen backen',
    'Weihnachtsmusik machen',
    'Bratäpfel essen',
    'Joggen und telefonieren',
    'Nachbarn beschenken',
    'Grittibänze backen',
    'Wochenende genießen (Puffer)',
    'Wochenende genießen (Puffer)',
    'Geocache suchen',
    'Kulturpfade Laim begehen',
    'DDR spielen',
    'Kirchen der Umgebung ansehen',
    'Torte im Detterbeck essen',
    'Wochenende genießen (Puffer)',
    'Wochenende genießen (Puffer)',
    'Eis von Patagon Helados',
    'Cocktails schlürfen',
    'Fog of Love spielen',
    'Moeraki Kemu spielen',
    'Ins Schwimmbad gehen',
    'Wochenende genießen (Puffer)',
    'Wochenende genießen (Puffer)',
    'Heiße Schoki trinken',
];

const fixedActions = [4, 6, 7, 8, 14, 15, 21, 22];

// This function can be used for manual tweaks.
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
    let rng = new Math.seedrandom('Ein Lichtlein brennt.');

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

    return adventsActions;
}

function setAdventText() {
    const adventsActions = initAdvent();
    const dayInMillis = 24 * 60 * 60 * 1000;
    const dateFormat = { weekday: 'long', month: 'long', day: 'numeric' };

    const firstOfDecember = new Date(2019, 11, 1);
    const today = new Date();
    const day = (today - firstOfDecember) / dayInMillis;

    $('#advent-date').text(today.toLocaleString('de-CH', dateFormat));

    if (day >= 0 && day < adventsActions.length) {
        $('#advent-action').text(adventsActions[Math.floor(day)]);
    }

    // Do this again the next day.
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    setTimeout(setAdventText, tomorrow - today + 1000);
}

function setChristmasCarolProgess() {
    const numPages = 117;
    const dayInMillis = 24 * 60 * 60 * 1000;
    const startDate = new Date(2019, 11, 1);
    const endDate = new Date(2019, 11, 24);
    const today = new Date();
    const day = (today - startDate) / dayInMillis;
    const totalDays = (endDate - startDate) / dayInMillis;

    let target = Math.round(numPages * Math.floor(day + 1) / totalDays);
    if (today < startDate) target = 0;
    if (today >= endDate) target = numPages;

    $('#christmascarol-pages').text(target.toString());

    // Do this again the next day.
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    setTimeout(setChristmasCarolProgess, tomorrow - today + 1000);
}

setAdventText();
setChristmasCarolProgess();

})();
