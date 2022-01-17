document.getElementById('btnSearch').addEventListener("click", e => {
    document.getElementById('profile').innerHTML = "";

    let userName = document.getElementById('txtUser').value;
    fetch(`https://api.github.com/users/${userName}`)
    .then(data => data.json())
    .then(data => {
        console.log(data);
        UI.showPFP(data.avatar_url);
    })
    document.getElementById('profile').style.visibility = "visible";
});