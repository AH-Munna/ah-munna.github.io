function matchCheck(re, userInput) {
    console.log("checking...");
    if (userInput == "") {
        alert("can't be empty");
    } else if (re.test(userInput)) {
        alert("input type valid.");
    } else {
        alert("Not valid.");
    }
}

function validationCheck(ex) {
    let checkingTemplate;
    let switchCase = ["Email", "Phone Number (bangladesh)", "Post Code (bangladesh)", "Credit card number"];
    console.log(ex.textContent.trim());

    switch (ex.textContent.trim()) {
        case switchCase[0]:
            checkingTemplate = /^([a-zA-Z0-9].?)+[^.]@([a-zA-Z0-9].?)+[^.]$/;
            break;
        case switchCase[1]:
            checkingTemplate = /^(\+)?(88)?01([0-9]){9}$/;
            break;
        case switchCase[2]:
            checkingTemplate = /^[0-9]{4}$/;
            break;
        case switchCase[3]:
            checkingTemplate = /^[0-9]{4} ?[0-9]{4} ?[0-9]{4} ?[0-9]{4}$/;
            break;
        default:
            console.log("none of them selected. then how code even came to this part!");
            break;
    }

    console.log(checkingTemplate);
    let userInput = prompt("validity check for this:");
    matchCheck(checkingTemplate, userInput);
}


//this section is for finding the first number inside a string
function lastIndex(str, startDigit) {
    let re = /[^0-9]/;
    console.log(str);

    var i;
    for (i = startDigit; i < str.length; i++) {
        if (re.test(str[i]) || i == str.length - 1) {
            return i;
        }
    }
    return i;
}

function numberCheck(e) {
    let str = prompt("first number in this text:");

    let numberEx = /[0-9]/;

    if (numberEx.test(str)) {
        let startDigit = str.match(numberEx).index;

        let endDigit = lastIndex(str, startDigit);
        let theNumber = parseInt(str.substring(startDigit, endDigit + 1));
        console.log(startDigit, endDigit, theNumber);

        alert("the number is: " + theNumber);
    } else {
        alert("no number found");
    }

}