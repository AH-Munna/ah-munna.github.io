class UI {
    static showPFP(img) {
        let imgContainer = document.createElement('img');
        imgContainer.setAttribute = 'src alt';
        imgContainer.src = img;
        imgContainer.className = 'p-2 mx-2 mt-2 img-fluid';
        imgContainer.alt = "profile image";

        console.log(imgContainer);
        document.getElementById('profileImage').appendChild(imgContainer);
    }

    static showBtnProfile(url) {
        let btnProfile = document.createElement('a');
        btnProfile.setAttribute = 'href'
        btnProfile.href = url;
        btnProfile.textContent = 'View Profile';
        btnProfile.className = 'btn btn-outline-primary btn-block p-1 m-2';
        document.getElementById('profileImage').appendChild(btnProfile);
    }

    static showRepos(num, label) {
        let reposContainer = document.createElement('div');
        reposContainer.className = 'text-center mx-2 my-2 bg-info text-white py-1 px-4 rounded-pill inline-block';

        let reposPub = document.createElement('div');
        reposPub.textContent = `${label}: ${num}`;
        reposContainer.appendChild(reposPub);

        document.getElementById('repos').appendChild(reposContainer);
    }

    static showInfo(infoLabel, info) {
        let uList = document.createElement('ul');
        let infoItems = document.createElement('li');
        infoItems.textContent = `${infoLabel}: ${info}`;
        
        uList.appendChild(infoItems);
        document.getElementById('info').appendChild(uList);
        console.log(uList.parentElement);
    }
}