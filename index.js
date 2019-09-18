function getInnerDieSVG(number) {
    switch (number) {
        case "one":
            return (`<rect x="43" y="43" width="15" height="15" rx="7.5" fill="white"></rect>`)
        case "two":
            return (`
                    <rect x="63" y="23" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="23" y="63" width="15" height="15" rx="7.5" fill="white" ></rect>`)
        case "three":
            return (`
                    <rect x="63" y="23" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="23" y="63" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="43" y="43" width="15" height="15" rx="7.5" fill="white" ></rect>`)
        case "four":
            return (`
                    <rect x="23" y="23" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="63" y="63" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="63" y="23" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="23" y="63" width="15" height="15" rx="7.5" fill="white" ></rect>`)
        case "five":
            return (`
                    <rect x="23" y="23" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="63" y="63" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="63" y="23" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="23" y="63" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="43" y="43" width="15" height="15" rx="7.5" fill="white" ></rect>`)
        case "six":
            return (`
                    <rect x="23" y="23" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="63" y="63" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="63" y="23" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="23" y="63" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="63" y="43" width="15" height="15" rx="7.5" fill="white" ></rect>
                    <rect x="23" y="43" width="15" height="15" rx="7.5" fill="white" ></rect>`)
    }
}
function getDieSVG(number) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.innerHTML = `<rect class="body" width="100" height="100" rx="15"></rect>`
    svg.innerHTML += getInnerDieSVG(number)
    return svg
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
        var dieString = getDieSVG(diceClasses[roll]);
        var newDie = document.createElement("div");
        newDie.classList.add("die", `die-${diceClasses[roll]}`);
        newDie.appendChild(dieString);
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
    return sum + modifier;
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
    return { rolls: rolls, onesRolled: onesRolled, hits: numHits };
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
    return { numDice: numDice, diceModifier: diceModifier };
}

document.querySelector("#roll-dice").addEventListener("click", function (e) {
    e.preventDefault();
    hideGlitchAlert();
    let { numDice, diceModifier } = readInputs();
    let { rolls, onesRolled, hits } = generateRolls(numDice);
    let sum = calculateSum(rolls, diceModifier);
    clearChildren(".dice-display");
    appendDice(rolls, '.dice-display');
    setGlitchAlert(onesRolled, numDice);
    updateNumericalOutput(hits, sum);
});

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener("focus", e => input.value = "");
})
