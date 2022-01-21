var tryLeft, correctAnswer = 10;
var maxValue = 25, minValue = 1;
document.addEventListener("DOMContentLoaded", onMinMaxChange(maxValue, minValue));

function onMinMaxChange(maxV, minV) {
    let numInput = document.getElementById('numInput');
    numInput.min = minV;
    numInput.max = maxV;
    numInput.placeholder = `guess the number (${minV}-${maxV})`;
    
    maxValue = maxV;
    minValue = minV;
}


document.getElementById('admin').addEventListener('click', function() {
    UI.gameStart(false);
    let m = parseInt(prompt("max:"));
    let n = parseInt(prompt("min"));
    if(m<n || m=="" || n=="") {
        alert("invlid! not changed");
    } else {
        onMinMaxChange(m, n);
        
        if(document.getElementById('rules')) {
            document.getElementById('rules').remove();
            UI.showRules();
        }
    }
    UI.gameStart(false);
    if (document.getElementById("toastMsg")) {
        document.getElementById("toastMsg").remove();
    }
});

document.getElementById('btnGame').addEventListener('click',function() {
    correctAnswer = parseInt(Math.floor(Math.random() * (maxValue-minValue+1))) + parseInt(minValue);
    UI.toastMessage(`The number is in between ${minValue}-${maxValue}, Try Guessing!`, 'success');
    if (document.getElementById('rules')) {
        document.getElementById('rules').remove();
        document.getElementById('btnRules').textContent = "Rules";
    }

    tryLeft = 2;
    document.getElementById('leftTries').textContent = 'Try Left: 3';
    UI.showGame();
});


document.getElementById('btnRules').addEventListener('click',function() {
    if (document.getElementById('rules')) {
        document.getElementById('btnRules').textContent = "Rules";
        document.getElementById('rules').remove();
    } else {
        UI.showRules();
    }
});

document.getElementById('btnQuit').addEventListener("click", function() {
    UI.toastMessage(`game ended`, "error");
    UI.gameStart(false);
});

document.getElementById('btnCheck').addEventListener('click', function() {
    let inputNumber = document.getElementById('numInput').value;
    inputNumber = parseInt(inputNumber); maxValue = parseInt(maxValue); minValue = parseInt(minValue);
  
    if (inputNumber === "" || (inputNumber > maxValue) || (inputNumber < minValue)) {
        UI.toastMessage(`The number can't be empty or out of bounds(${minValue}-${maxValue})`, "error")
    } else {
        document.getElementById('leftTries').textContent = `Try Left: ${tryLeft--}`;

        document.getElementById('numInput').value = '';

        if (tryLeft < 0) {
            UI.toastMessage(`Out of tries! Game Over. \nThe Correct answer was: ${correctAnswer}`, "error");
            UI.gameStart(false);
            if(correctAnswer == inputNumber) {
                UI.toastMessage("Congrats! you have guessed correctly in your last try", "success");
                UI.gameStart(false);
            }
        } else {
            if(correctAnswer == inputNumber) {
                UI.toastMessage(`Congrats! you have guessed correctly in ${2-tryLeft} tries`, "success");
                UI.gameStart(false);
                console.log(correctAnswer);
            } else if(correctAnswer > inputNumber) {
                UI.toastMessage("Try larger number", "bg-info");
                console.log(correctAnswer);
            } else {
                UI.toastMessage("Try smaller number", "bg-info");
                console.log(correctAnswer);
            }
        }
    }
});