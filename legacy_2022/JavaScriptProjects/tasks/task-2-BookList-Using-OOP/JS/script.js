//evenlistener
document.getElementById("submit").addEventListener("click", addBook);
document.addEventListener("DOMContentLoaded", function(){
    let localBooks = checkLocal();
    localBooks.forEach(function(item) {
        UI.insertToTable(item);
    })
})

//class
class Books {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {
    static insertToTable(book) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td><span type="button" class="text-danger" onclick="removeFromTable(this)">X</span></td>`;

        document.getElementById("tableData").appendChild(newRow);
    }

    static toastMessage(msg, clsName) {
        let toastMsg = document.createElement('div');
        toastMsg.innerHTML = msg;
        toastMsg.className = clsName;
        toastMsg.id = "toastmsg";

        document.querySelector('.container').insertBefore(toastMsg, document.getElementById('book-form'));

        setTimeout(function(){
            document.getElementById('toastmsg').remove();
        }, 4000);
    }
}
class Storage {
    static addToLocal(book) {
        let localBooks = checkLocal();
        localBooks.push(book);
        localStorage.setItem("Books", JSON.stringify(localBooks));
        UI.insertToTable(book);
    }

    static deletBookFromLocal(isbn) {
        let localBooks = checkLocal();
        localBooks.forEach((item, index) => {
            if(item.isbn === isbn) {
                localBooks.splice(index, 1);
                localStorage.setItem("Books", JSON.stringify(localBooks));
            }
        })
    }
}

//add
function addBook(e) {
    let title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
    
    if(title==='' || author==='' || isbn==='') {
        UI.toastMessage("field(s) can't be empty", "error");
    } else {
        let book = new Books(title, author, isbn);
        Storage.addToLocal(book);
        UI.toastMessage("Book added", "success");
    
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("isbn").value = '';
    }


    e.preventDefault();
}

function checkLocal() {
    if(localStorage.getItem("Books") === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem("Books"));
    }
}

//remove
function removeAllItems(e) {
    localStorage.clear();

    document.getElementById('tableData').innerHTML = "";

    UI.toastMessage("All data deleted", "success");
}

function removeFromTable(e) {
    let book = checkLocal();

    Storage.deletBookFromLocal(e.parentElement.previousElementSibling.textContent.trim());
    e.parentElement.parentElement.remove();

    UI.toastMessage("book deleted", "success");
}