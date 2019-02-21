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

document.querySelector("#roll-dice").addEventListener("click", function(e) {
    e.preventDefault();
    diceValues = {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
    }
    numDice = parseInt(document.querySelector("#dice").value);
    diceModifier = parseInt(document.querySelector("#modifier").value);
    results = [];
    for (var i = 0; i < numDice; i++) {
        result = Math.floor(Math.random() * Math.floor(6)) + 1;
        results.push(result);
    }
    resultsDiv = document.querySelector(".dice-display");
    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.firstChild);
    }
    results.forEach(element => {
        var newDie = document.createElement("i");
        newDie.classList.add("fa-dice-" + diceValues[element]);
        newDie.classList.add("fas");
        newDie.classList.add("fa-3x");
        document.querySelector('.dice-display').appendChild(newDie);
    })
    numHits = 0;
    results.forEach(element => element > 4 ? numHits++ : numHits);
    document.querySelector(".num-hits").textContent = numHits;
    sum = 0;
    results.forEach(element => sum += element);
    sum += diceModifier;
    document.querySelector(".sum").textContent = sum;
});
