class UI {
    static showPFP(img) {
        let imgContainer = document.createElement('img');
        imgContainer.setAttribute = 'src alt';
        img = 'https://i.imgur.com/LskHhCZ.png';
        imgContainer.src = img;
        imgContainer.className = 'p-2 m-2'
        imgContainer.alt = "profile image";
        console.log(imgContainer);
        document.getElementById('profile').appendChild(imgContainer);
    }
}