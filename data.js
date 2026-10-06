const REGIONS = [

    {
        id: "north",
        name: "North India",
        t: 39
    },

    {
        id: "northwest",
        name: "Northwest India",
        t: 44
    },

    {
        id: "east",
        name: "East India",
        t: 38
    },

    {
        id: "west",
        name: "West India",
        t: 36
    },

    {
        id: "central",
        name: "Central India",
        t: 42
    },

    {
        id: "northeast",
        name: "Northeast India",
        t: 31
    },

    {
        id: "southern peninsula",
        name: "Southern Peninsula",
        t: 35
    }

];


const LEVELS = [

    {
        name: "Normal",
        c: "l0"
    },

    {
        name: "Watch",
        c: "l1"
    },

    {
        name: "Warning",
        c: "l2"
    },

    {
        name: "Severe",
        c: "l3"
    }

];


function sev(temp) {

    if (temp < 37) {
        return 0;   // Normal
    }

    if (temp < 40) {
        return 1;   // Watch
    }

    if (temp < 45) {
        return 2;   // Warning
    }

    return 3;       // Severe

}


function badge(level) {

    return '<span class="badge ' +
        LEVELS[level].c +
        '">' +
        LEVELS[level].name +
        '</span>';

}


function legendHTML() {

    return LEVELS.map(function(level) {

        return '<span class="badge ' +
            level.c +
            '">' +
            level.name +
            '</span>';

    }).join("");

}