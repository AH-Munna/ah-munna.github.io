class UI {
    static showGame() {
        let btnGame = document.getElementById('btnGame');
        btnGame.disabled = true;
        btnGame.textContent = 'Game is running';
        btnGame.className = 'd-flex m-auto btn-lg fw-bold px-5 py-2 fs-3 btn-outline-danger my-5';

        this.gameStart(true);
    }

    static showRules() {
        let ruleUI = document.createElement('div');
        ruleUI.innerHTML = `<ul><li>the correct answer will be a number between ${minValue} and ${maxValue}</li><li>you will have 3 chances of guessing the correct answer</li><li>hints will be given for guessing wrong</li><li>the correct answer will be shown if:<ul><li>out of tries</li><li>forfeited</li></ul></li><li>Enjoy</li><li>also check console if you want to see correct answer</li></ul>`

        ruleUI.id = 'rules'
        ruleUI.className = 'shadow p-3'

        document.querySelector('.container').insertBefore(ruleUI, document.getElementById('footer'));
        document.getElementById('btnRules').textContent = "Close Rules";
    }

    static gameStart(flag) {
        if (flag) {
            document.getElementById('leftTries').style.visibility = 'visible';
            document.getElementById('numInput').disabled = false;
            document.getElementById('btnCheck').disabled = false;
            document.getElementById('btnQuit').disabled = false;
        } else {
            document.getElementById('leftTries').style.visibility = 'hidden';
            document.getElementById('numInput').value = "";
            document.getElementById('numInput').disabled = true;
            document.getElementById('btnCheck').disabled = true;
            document.getElementById('btnQuit').disabled = true;

            let btnGame = document.getElementById('btnGame');
            btnGame.disabled = false;
            btnGame.textContent = 'Play Again';
            btnGame.className = 'd-flex m-auto btn-lg fw-bold px-5 py-2 fs-3 btn-outline-success my-5';
        }
    }

    static toastMessage(message, clsName) {
        if (document.getElementById("toastMsg")) {
            document.getElementById("toastMsg").remove();
        }

        let msg = document.createElement('div');
        msg.className = `${clsName} py-2 px-5 my-2 text-center fs-4`
        msg.textContent = message;
        msg.id = "toastMsg";

        document.querySelector(".container").insertBefore(msg, document.getElementById('theGame'));
    }
}