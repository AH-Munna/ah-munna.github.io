document.getElementById('btnSearch').addEventListener("click", e => {
    let userName = document.getElementById('txtUser').value;
    if (userName === '') {
        document.getElementById('profile').style.visibility = "hidden";
    } else {
        document.getElementById("profileImage").innerHTML = "";
        document.getElementById('repos').innerHTML = "";

        fetch(`https://api.github.com/users/${userName}`)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            UI.showPFP(data.avatar_url);
            UI.showBtnProfile(data.html_url);

            UI.showRepos(data.public_repos, "Public Repos");
            UI.showRepos(data.public_gists, "Public Gists");
            UI.showRepos(data.followers, "Followers");
            UI.showRepos(data.following, "Following");

            UI.showInfo('Company', data.company);
            UI.showInfo('Twitter', data.twitter_username);
        })
        document.getElementById('profile').style.visibility = "visible";
    }
});