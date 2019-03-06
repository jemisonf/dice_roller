var asyncLoadFontAwesome = function() {
    headElement = document.getElementsByTagName("head")[0];
    linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "https://use.fontawesome.com/releases/v5.2.0/css/all.css";
    linkElement.integrity = "sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ";
    linkElement.crossOrigin = "anonymous";
    headElement.appendChild(linkElement);
};

var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) {
    raf(asyncLoadFontAwesome);
} else {
    window.addEventListener("load", asyncLoadFontAwesome);
}

function clearChildren(queryString) {
    parent = document.querySelector(queryString);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function appendDice(rolls, queryString) {
    diceClasses = {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
    }
    rolls.forEach(roll => {
        var newDie = document.createElement("i");
        newDie.classList.add(`fa-dice-${diceClasses[roll]}`, "fas", "fa-3x");
        document.querySelector(queryString).appendChild(newDie);
    })
}

function setGlitchAlert(onesRolled, totalDice) {
    alert = document.querySelector("#glitch-alert");
    if (onesRolled >= Math.ceil(totalDice / 2)) {
        document.querySelector("#glitch-alert").classList.remove("hidden");
    }
}
function calculateSum(rolls, modifier) {
    sum = rolls.reduce((partialSum, roll) => partialSum += roll);
    return  sum + modifier;
}

function updateNumericalOutput(numberOfHits, totalSum) {
    document.querySelector(".num-hits").textContent = numberOfHits;
    document.querySelector(".sum").textContent = totalSum;
}

function generateRolls(numRolls) {
    let onesRolled = 0;
    let numHits = 0;
    rolls = Array.from(new Array(numRolls), (roll) => {
        roll = Math.floor(Math.random() * Math.floor(6) + 1);
        if (roll == 1) onesRolled++;
        if (roll > 4) numHits++;
        return roll;
    })
    return {rolls: rolls, onesRolled: onesRolled, hits: numHits};
}

function hideGlitchAlert() {
    alert = document.querySelector("#glitch-alert");
    if (!alert.classList.contains("hidden")) {
        alert.classList.add("hidden");
    }
}

function readInputs() {
    let numDice = parseInt(document.querySelector("#dice").value);
    let diceModifier = parseInt(document.querySelector("#modifier").value);
    return {numDice: numDice, diceModifier: diceModifier};
}

document.querySelector("#roll-dice").addEventListener("click", function(e) {
    e.preventDefault();
    hideGlitchAlert();
    let {numDice, diceModifier} = readInputs();
    let {rolls, onesRolled, hits} = generateRolls(numDice);
    let sum = calculateSum(rolls, diceModifier);
    clearChildren(".dice-display");
    appendDice(rolls, '.dice-display');
    setGlitchAlert(onesRolled, numDice);
    updateNumericalOutput(hits, sum);
});
