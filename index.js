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
    diceValues = {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
    }
    rolls.forEach(roll => {
        var newDie = document.createElement("i");
        newDie.classList.add(`fa-dice-${diceValues[roll]}`, "fas", "fa-3x");
        document.querySelector(queryString).appendChild(newDie);
    })
}

document.querySelector("#roll-dice").addEventListener("click", function(e) {
    e.preventDefault();
    alert = document.querySelector("#glitch-alert");
    if (!alert.classList.contains("hidden")) {
        alert.classList.add("hidden");
    }
    numDice = parseInt(document.querySelector("#dice").value);
    diceModifier = parseInt(document.querySelector("#modifier").value);
    results = [];
    onesRolled = 0;
    numHits = 0;
    for (var i = 0; i < numDice; i++) {
        result = Math.floor(Math.random() * Math.floor(6)) + 1;
        if (result == 1) onesRolled++;
        if (result > 4) numHits++;
        results.push(result);
    }
    clearChildren(".dice-display");
    appendDice(results, '.dice-display');
    document.querySelector(".num-hits").textContent = numHits;
    sum = 0;
    results.forEach(element => sum += element);
    sum += diceModifier;
    document.querySelector(".sum").textContent = sum;
    console.log(onesRolled);
    console.log(Math.floor(numDice / 2));
    if (onesRolled >= Math.ceil(numDice / 2)) {
        document.querySelector("#glitch-alert").classList.remove("hidden");
    }
});
