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
        newDie.classList.add("fa-2x");
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