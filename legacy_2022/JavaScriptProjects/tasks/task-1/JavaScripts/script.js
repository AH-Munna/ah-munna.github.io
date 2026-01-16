document.getElementById("addTask").addEventListener("click", addTaskToList);
document.getElementById("removeTasks").addEventListener("click", removeAllTasks);
document.getElementById("searchItem").addEventListener("keyup", searchShow);
document.addEventListener("DOMContentLoaded", getLocalTasks);
sortItems();

function addTaskToList() {
    let txtName = document.getElementById("txtTaskName").value;
    addToLocalStorage(txtName);

    if (txtName === "") {
        alert("can't be empty");
    } else {
        let item = document.createElement('li');
        item.innerHTML = `<span>${txtName}</span><span type="button" class="text-danger float-end" onclick="removeFromList(this)">X</span>`;
        console.log(item);
        document.getElementById("itemList").appendChild(item);
        //optional sorting
        sortItems();
        document.getElementById("txtTaskName").value = "";
    }
}

function removeFromList(e) {
    if (confirm("are you sure?")) {
        e.parentElement.remove();

        removeFromLocal(e.parentElement);
    }
}

function sortItems() {
    if (document.querySelectorAll('li').length > 1) {
        var list, i, switching, b, shouldSwitch;
        list = document.getElementById("itemList");
        switching = true;

        while (switching) {
            switching = false;
            b = list.getElementsByTagName("LI");
            for (i = 0; i < (b.length - 1); i++) {
                shouldSwitch = false;
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                b[i].parentNode.insertBefore(b[i + 1], b[i]);
                switching = true;
            }
        }
    }
}

function removeAllTasks() {
    let allItems = document.querySelectorAll('li');
    allItems.forEach(function (item) {
        item.remove();
    })

    localStorage.clear();
}

function searchShow() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchItem");
    filter = input.value.toUpperCase();
    ul = document.getElementById("itemList");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("span")[0];
        txtValue = a.textContent || a.innerText;
        console.log(txtValue.toUpperCase().indexOf(filter));
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

let checkTasks = () => {
    if (localStorage.getItem('localTasks') === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('localTasks'));
    }
}

let addToLocalStorage = taskName => {
    let localTasks = checkTasks();
    localTasks.push(taskName);
    localTasks.sort();
    localStorage.setItem('localTasks', JSON.stringify(localTasks));
}

function getLocalTasks() {
    let localTasks = checkTasks();

    localTasks.forEach(x => {
        let item = document.createElement('li');
        item.innerHTML = `<span>${x}</span><span type="button" class="text-danger float-end" onclick="removeFromList(this)">X</span>`;
        document.getElementById("itemList").appendChild(item);
    })

}

function removeFromLocal(item) {
    let localTasks = checkTasks();

    localTasks.forEach((task, index) => {
        task += "X";
        console.log(item.textContent.trim(), task)
        if (item.textContent.trim() === task) {
            console.log("true");
            localTasks.splice(index, 1);
        }
    });
    localStorage.setItem("localTasks", JSON.stringify(localTasks));
}