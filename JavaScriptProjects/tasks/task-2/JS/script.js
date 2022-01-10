// intialize/declare
let titleName = document.getElementById('inputBookName');
let authorName = document.getElementById('inputAuthorName');
let isbnNumber = document.getElementById('inputISBN');
let btnSubmit = document.getElementById('btnSubmit');
let toastMessage = document.getElementById('toastMessages');
/*
for future efficiency and update
let allItemsObject = {title[], author[], isbn[]};
*/

//add events
btnSubmit.addEventListener("click", addItemsToLocal);
document.getElementById("removeLocal").addEventListener("click", clearAllItems);
document.addEventListener("DOMContentLoaded", getLocalItems);


//add & show items
function addItemsToLocal() {
    if (titleName.value === "" || authorName.value === "" || isbnNumber.value == "") {
        toastMessage.textContent = "all fields are required."
        toastMessage.className = "text-danger";
        toastMessage.style.background = "#e0b1ba"
        toastMessage.style.fontSize = "22px";
        toastMessage.style.visibility = "visible";
        setTimeout(function () {
            toastMessage.style.visibility = "hidden";
        }, 4000);
    } else {
        //title
        let localTitle = checkItems("localTitle");
        localTitle.push(titleName.value);
        localStorage.setItem('localTitle', JSON.stringify(localTitle));

        //author
        let localAuthor = checkItems("localAuthor");
        localAuthor.push(authorName.value);
        localStorage.setItem('localAuthor', JSON.stringify(localAuthor));

        //isbn
        let localISBN = checkItems("localISBN");
        localISBN.push(isbnNumber.value);
        localStorage.setItem('localISBN', JSON.stringify(localISBN));

        var k;
        try {
            if (parseInt(document.getElementById('tableData').lastChild.firstChild.textContent)) {
                k = parseInt(document.getElementById('tableData').lastChild.firstChild.textContent);
            }
        } catch (err) {
            k = 0;
            console.log(`first element gets null value\n${err}`);
        }

        let allTableData = document.createElement('tr');
        allTableData.innerHTML = `<th scope="row">${k + 1}</th> <td>${titleName.value}</td><td>${authorName.value}</td><td>${isbnNumber.value}</td><td><span type="button" class="text-danger" onclick="removeFromTable(this)">X</span></td>`;
        document.getElementById('tableData').appendChild(allTableData);

        titleName.value = "";
        authorName.value = "";
        isbnNumber.value = "";
    }
}

function getLocalItems() {
    let localTitle = checkItems("localTitle");
    let localAuthor = checkItems("localAuthor");
    let localISBN = checkItems("localISBN");

    var k = 1;
    for (let i in localTitle) {
        let allTableData = document.createElement('tr');
        allTableData.innerHTML = `<th scope="row">${k++}</th> <td>${localTitle[i]}</td><td>${localAuthor[i]}</td><td>${localISBN[i]}</td><td><span type="button" class="text-danger" onclick="removeFromTable(this)">X</span></td>`;
        document.getElementById('tableData').appendChild(allTableData);
    }
    console.log(localTitle, localAuthor, localISBN);
}

function checkItems(arrayName) {
    if (localStorage.getItem(`${arrayName}`) === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem(`${arrayName}`));
    }
}

//remove items
function clearAllItems() {
    document.getElementById("tableData").innerHTML = "";
    localStorage.clear();
}

function removeFromTable(e) {
    let parent = e.parentElement.parentElement;
    console.log(parent);

    let localTitle = checkItems("localTitle");
    let localAuthor = checkItems("localAuthor");
    let localISBN = checkItems("localISBN");

    for (let index in localTitle) {
        let item = `${parseInt(index) + 1} ${localTitle[index] + localAuthor[index] + localISBN[index]}X`;

        if (parent.textContent == item) {
            localTitle.splice(index, 1);
            localAuthor.splice(index, 1);
            localISBN.splice(index, 1);

            console.log(localTitle, localAuthor, localISBN);

            localStorage.setItem('localTitle', JSON.stringify(localTitle));
            localStorage.setItem('localAuthor', JSON.stringify(localAuthor));
            localStorage.setItem('localISBN', JSON.stringify(localISBN));
            break;
        }
    }
    e.parentElement.parentElement.remove();
    fixRowNumbers();
}

function fixRowNumbers() {
    let items = document.getElementById("tableData").children;
    var k = 1;
    for (let x in items) {
        if (/^[0-9]$/.test(x)) {
            console.log(x, items[x].firstChild);
            items[x].firstChild.textContent = k++;
        }
    }
}