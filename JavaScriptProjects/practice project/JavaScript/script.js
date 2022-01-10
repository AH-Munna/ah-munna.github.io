//fetch and promise

document.getElementById("syncAndAsync").addEventListener("click", getDataJson);
function getDataJson() {
    /*fetch('http://api.icndb.com/jokes/random')
        .then(function (r) {
            return r.json();
        }).then(function (recievedText) {
            console.log(recievedText);
            writeSomething(recievedText.value.joke);
        }).catch(function (err) {
            console.log(`Error: ${err}`);
        });
    */
    fetch('dataFiles/data.json')
        .then(data => data.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}


let func1 = param1 => {
    console.log();
}


//syncronus asyncronus
//sync
/*
function getDataJson() {
    let myXHRData = new XMLHttpRequest();
    myXHRData.open("GET", "data.json", true);
    myXHRData.onload = function () {
        if (this.status == 200) {
            let data = JSON.parse(this.responseText);
            setTimeout(function () {
                let data2 = { name: "R", age: 5, hometown: "D", married: false };
                data.persons.push(data2);
                console.log(data.persons);
            }, 2000);

            setTimeout(function () {
                console.log(data)
            }, 6000);
        }
    }
    myXHRData.send();
}
//async
function func1() {
    let promis = new Promise(function (reslove, reject) {
        setTimeout(function () {
            console.log("func1");
            let error = true;

            if (!error) {
                reslove();
            } else {
                reject("Error! something wrong!")
            }
        }, 3000);
    });
    return promis;
}
function func2() {
    setTimeout(function () {
        console.log("func2");
    }, 500);
}

func1().then(func2).catch(function (err) {
    console.log(err);
}); */


//Ajax from external
function fromExternal() {
    let number = prompt("how many jokes:");
    let myXHR = new XMLHttpRequest();
    myXHR.open("GET", `http://api.icndb.com/jokes/random/${number}`, true);

    myXHR.onload = function () {
        if (this.status == 200) {
            let jsString = JSON.parse(this.responseText);
            console.log(jsString);
            let listItems = "";
            jsString.value.forEach(function (item) {
                console.log(item.joke);
                listItems += `<li>${item.joke}</li>`;
            });
            writeSomething(listItems);
        }
    }
    myXHR.send();
}

document.getElementById("fromExternal").addEventListener("click", fromExternal);


//Ajax from internal
function writeSomething(str) {
    document.getElementById("olDemo").innerHTML = str;
}

document.getElementById("ajaxCheck").addEventListener("click", ajaxCheck);

function ajaxCheck() {
    //console.log("button clicked");
    let myXHR = new XMLHttpRequest();

    myXHR.open("GET", "dataFiles/myData.txt", true);

    myXHR.onload = function () {
        if (this.status == 200) {
            console.log(this.responseText);
            writeSomething(this.responseText);
        }
    }
    myXHR.send();

    //console.log(myXHR);
}



//JSON external data
/* let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    console.log("hello");
    if (this.readyState == 4 && this.status == 200) {
        let data = this.responseText;
        jsonData(data);
    }
};
xmlhttp.open("GET", "data.json", true);
xmlhttp.send();

function jsonData(data) {
    let stringData = JSON.parse(data);
    console.log(stringData);

    for (x of stringData.persons) {
        console.log(x);
    }
}


//JSON conversion
let student = {
    firstName: "Ahsanul Hauqe", lastName: "Munna", age: 23,
    object2: {a: "hello", b: "wrold"}, nullTest: null, dob: 09 - 05 - 1998
};

console.log(student);
console.log("a " + JSON.stringify(student));
console.log(JSON.parse(JSON.stringify(student))); */

//regular expression
/* let re = /ahs*n*l/i; //i case insensetive // * 0 or more times // ? optional
re = /Ah.anul/g;
//re = /Mu*na/g;
let str = 'Munna Ahsanul Haque Munna Ahsanul';
let matching = re.exec(str);
matching = str.match(re); // let re = /Ahsanul/g; for all matched
let newStr = str.replace(re, "M");

console.log(newStr);

document.getElementById('demo').textContent = matching;

re = /x(?=y)/;
re = /^(\+)?(88)?01([0-9]){9}$/;
str = "abcdxyabycd"
str = "+8801799999999";
console.log(str.match(re));

//email checking
re = /^([a-zA-Z0-9]\.?)+[^\.]@([a-zA-Z]\.?)+[^\.]$/;
str = "ah.munna@gm.ail.com"
console.log(re.test(str)); */

//error handling
//let a = 16;
/* try {
    test();
    //if(a<10) throw "too small";
    //if(a>15) throw "too big";
} catch(errType) {
    console.log(errType.message + " " + errType.name);
} finally {
    console.log("inside finally");
} */


//form style from js
document.getElementById('linkNameId').addEventListener("keyup", test1);
function test1(e) {
    this.style.background = "gray";
    // console.log(this.value);
    // console.log("keyupped");
    document.getElementById('textForLinkNameId').textContent = this.value;
}

//JS call from html
//onclick=""   onmouseover=""
function mouseOverCPP() {
    console.log("js function called from cpp");
}

/*
document.getElementById('firstListItem').addEventListener("click", message);
function message() {
    console.log("button clicked");
}

//adding item/tag to document
let lItems = document.createElement('li');
lItems.className = "text-info";
lItems.id = "liFromJS";
//lItems.innerHTML = "<b>everything here is from javaScript</b>";
lItems.appendChild(document.createTextNode('everything here is from javaScript'));

let oList = document.querySelector('ol');
oList.appendChild(lItems);

console.log(lItems, oList);


//DOCUMENT OBJECT MODEL
document.getElementById("fromJavascript").style.background = '#00fa9a';
//document.getElementById("fromJavascript").textContent = "written from javascript";
document.getElementById("fromJavascript").innerHTML = "<i>written from javascript</i>";
let fromJavascriptID = document.getElementById("fromJavascript");
fromJavascriptID.className = "text-white";
document.querySelector('.text-white').style.color = '#EEE';

let liEven = document.querySelectorAll("ul li:nth-child(even)");
liEven.forEach(function(x) {
    x.style.background = "red";
});
*/

//OOP JAVASCRIPT
//different way to declare same function
/* function ageCalculator(dob) {
    let birthDate = new Date(dob);
    let ageDiff = Date.now() - birthDate.getTime();
    let ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

let compactAgeCalculator = dob => {
    return Math.abs( (new Date(Date.now() - (new Date(dob)).getTime())).getUTCFullYear() - 1970 );
}

//class
class Student {
    constructor(fName, lName, dob) {
        this.firstName = fName;
        this.lastName = lName;
        this.dateOfBirth = dob;
    }
    calculateAge() {
        let birthday = new Date(this.dateOfBirth);
        let diff = Date.now() - birthday.getTime();
        let ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
};

//inheritence
class StudentCTDetails extends Student {
    constructor(fName, lName, dob, roll, result) {
        super(fName, lName, dob);
        this.roll = roll;
        this.result = result;
    }
    grade() {
        if(this.result>=80 && this.result<101) {
            return "A+";
        } else if(this.result>=60 && this.result<80) {
            return "A";
        } else if(this.result>=40 && this.result<60) {
            return "B";
        } else if(this.result>=0 && this.result<40) {
            return "F";
        } else {
            return "invalid result";
        }
    }
}

//object and getObjects
let student1 = new Student("Ahsanul Haque", "Munna", "05-09-1998");
let result1 = new StudentCTDetails("AH", "Munna", "12-31-1997", 13, 82);
console.log(student1);
console.log(student1.calculateAge());
console.log(ageCalculator(student1.dateOfBirth));
console.log(compactAgeCalculator(student1.dateOfBirth));
console.log(result1);
console.log(result1.grade());
console.log(result1.calculateAge()); */

//nested function
//let a = (name) => { return (age) => console.log(name, age) }

//date object
/* let date = new Date();
console.log(date); //date.get Date("01/23/1998 11:11:11") */

//math object
/* let num = Math.PI;
num = Math.floor(Math.random() * 100); //0 to 99
console.log(num); */

//object function
/* let obj = {name: "Ahsanul Haque", age:24, myFunction: function(){return `Hello ${this.name}`}};
console.log(obj.myFunction()); */

//array map
/* let arr = [1, 2, 3, 4, 5];
let addTwo = item => {
    return item + 2;
}
let arrEx = arr.map(addTwo);
console.log(arrEx); */

//arrow function
/* let arrowFunction = (name) => {
    console.log(`Hello ${name}`);
}
arrowFunction("Ahsanul");*/
//Function forEach
/* let str = ["abc de", "abcd", "abcde", "abcdef"];
let stringForEach = (item, index, array) => {
    console.log(`item: ${item} index: ${index}\n${array}`);
}
str.forEach(stringForEach); */


//square summation
/* let num = prompt("Summation of square number for this number:");
if( isNaN(num) || num<1 || num>100) {
    console.log("Invalid or out of bound number");
} else {
    num = parseInt(num);
    let ansString = [1];
    let sum = 1;

    for (let i=2; i<=num; i++) {
        ansString[i-1] = i * i;
        sum += ansString[i-1];
    }

    console.log(ansString.join(" + ") + ` = ${sum}`);
} */



//loop
/* let loopArray = ["Ahsanul", "Haque", "Munna"];

for (let x in loopArray) {
    for (let y of loopArray[x]) {
        console.log(`index :${x}  value :${loopArray[x]} 2d value: ${y}`);
    }
    console.log("nested loop ended\n\n");
} */


//grade if else
/* let choice = parseInt(prompt("your number:"));

let grade, flag = false;
if (choice >= 90 && choice < 101) {
    grade = "A+"; flag = true;
} else if (choice >= 80 && choice < 90) {
    grade = "A"; flag = true;
} else if (choice >= 70 && choice < 80) {
    grade = "A-"; flag = true;
} else if (choice >= 60 && choice < 70) {
    grade = "B"; flag = true;
} else if (choice >= 0 && choice < 60) {
    grade = "F"; flag = true;
} else {
    console.log("invalid number");
}
flag ? console.log(`your grade: ${grade}`) : {};

//math operation switch
console.log("Select an Option\n\t1. Addition\n\t2. Subtraction\n\t3. Multiplication\n\t4. Divition");
let a = parseInt(prompt("first number:"));
let b = parseInt(prompt("second number:"));
choice = parseInt(prompt("Choose an operation number:"));
let aC = isNaN(a);
let bC = isNaN(b);
let choiceC = isNaN(choice);
if (aC || bC || choiceC) {
    console.log("only number operation is supported.")
} else {
    let ans;
    switch (choice) {
        case 1:
            ans = a + b;
            flag = true;
            break;
        case 2:
            ans = a - b;
            flag = true;
            break;
        case 3:
            ans = a * b;
            flag = true;
            break;
        case 4:
            ans = (a / b).toPrecision(3);
            flag = true;
            break;
        default:
            flag = false;
    }
    flag ? console.log(ans) : console.log("Invalid Input");
} */


/* window.alert("Hello World!");
alert("Hello!");
document.write("ahsanul Haque");

console.log("this message is in console.");

var x = prompt("your name:");
document.write(x);
console.log(x); */

// Celcius to Fahrenheit
/* let tempC = prompt("Celcius:");
let tempF = (9/5) * tempC;
tempF += 32;
tempF = tempF.toPrecision(3);
alert("Fahrenheit: " + tempF);
console.log("task complete"); */

// variable conversion
/* let a = 5431213;
console.log(a);
console.log(a.toString(2));
console.log(a.toString(8));
console.log(a.toString(16));
console.log(parseInt(a));

//isNaN
console.log(isNaN(a));
a = "abcd";
console.log(isNaN(a));

//string
console.log("Ahsanul Haque Munna".length);

//ES6
let name = `rahim`;
let age = 36;
console.log(`${name}'s age is ${age}`); */