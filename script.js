// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqoNzaJdOc6T2XqiA7sbEaTm5_0Hgk1Do",
    authDomain: "button-masher-370d3.firebaseapp.com",
    projectId: "button-masher-370d3",
    storageBucket: "button-masher-370d3.appspot.com",
    messagingSenderId: "1096628031183",
    appId: "1:1096628031183:web:551c6610e0c2cd294b31ba"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getDatabase, set, get, update, remove, ref, child}
from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const db = getDatabase();

// from index.html
let loginUsernameInput = document.getElementById('login-username-input');
let loginPasswordInput = document.getElementById('login-password-input');
let loginButton = document.getElementById('login-button');

let signupUsernameInput = document.getElementById('signup-username-input');
let signupPasswordInput = document.getElementById('signup-password-input');
let signupButton = document.getElementById('signup-button');

// from gamescreen.html
let gamescreenBackground = document.getElementById('gamescreen-body');
let leaderPlayer1 = document.getElementById('leaderboard-player1');
let leaderPlayer2 = document.getElementById('leaderboard-player2');
let leaderPlayer3 = document.getElementById('leaderboard-player3');
let leaderPlayer4 = document.getElementById('leaderboard-player4');
let leaderPlayer5 = document.getElementById('leaderboard-player5');
let playerScore = document.getElementById('your-score');
let mainButton = document.getElementById('main-button');
let updateButtonStylingButton = document.getElementById('update-button-style');

// from store.html
let storeB1Status = document.getElementById('store-B1-status');
let storeB2Status = document.getElementById('store-B2-status');
let storeB3Status = document.getElementById('store-B3-status');
let storeB4Status = document.getElementById('store-B4-status');
let storeB5Status = document.getElementById('store-B5-status');
let storeB6Status = document.getElementById('store-B6-status');
let storeB7Status = document.getElementById('store-B7-status');
let storeB8Status = document.getElementById('store-B8-status');

let storeB1 = document.getElementById('store-B1');
let storeB2 = document.getElementById('store-B2');
let storeB3 = document.getElementById('store-B3');
let storeB4 = document.getElementById('store-B4');
let storeB5 = document.getElementById('store-B5');
let storeB6 = document.getElementById('store-B6');
let storeB7 = document.getElementById('store-B7');
let storeB8 = document.getElementById('store-B8');
let storeRefreshButton = document.getElementById('store-refresh');

// button sound effects
let soundeffect1 = new Audio('./button-soundeffects/soundeffect1.mp3');
let soundeffect2 = new Audio('./button-soundeffects/soundeffect2.mp3');
let soundeffect3 = new Audio('./button-soundeffects/soundeffect3.mp3');
let soundeffect4 = new Audio('./button-soundeffects/soundeffect4.mp3');
let soundeffect5 = new Audio('./button-soundeffects/soundeffect5.mp3');
let soundeffect6 = new Audio('./button-soundeffects/soundeffect6.mp3');
let soundeffect7 = new Audio('./button-soundeffects/soundeffect7.mp3');
let soundeffect8 = new Audio('./button-soundeffects/soundeffect8.mp3');

function loginFunction()
{
    const dbref = ref(db);

    get(child(dbref, "Users/" + loginUsernameInput.value))
    .then((snapshot) => {
        if (snapshot.exists())
        {
            if (snapshot.val().Password === loginPasswordInput.value)
            {
                localStorage.setItem('localUsername', snapshot.val().Username);
                localStorage.setItem('localPassword', snapshot.val().Password);
                localStorage.setItem('localPersonalScore', JSON.stringify(snapshot.val().Score));
                localStorage.setItem('B1Status', snapshot.val().B1);
                localStorage.setItem('B2Status', snapshot.val().B2);
                localStorage.setItem('B3Status', snapshot.val().B3);
                localStorage.setItem('B4Status', snapshot.val().B4);
                localStorage.setItem('B5Status', snapshot.val().B5);
                localStorage.setItem('B6Status', snapshot.val().B6);
                localStorage.setItem('B7Status', snapshot.val().B7);
                localStorage.setItem('B8Status', snapshot.val().B8);
                localStorage.setItem('buttonSelection', snapshot.val().ButtonSelection);

                alert('Log in Successful!!');
                window.location.href = './gamescreen.html';
            }

            else
            {
                alert('Password is incorrect :(');
            }
        }

        else
        {
            alert('Account not found :(');
        }

    })
    .catch((error) => {alert(error)});
}

function signupFunction()
{
    set(ref(db, "Users/" + signupUsernameInput.value), {
        Username: signupUsernameInput.value,
        Password: signupPasswordInput.value,
        Score: 0,
        B1: false,
        B2: false,
        B3: false,
        B4: false,
        B5: false,
        B6: false,
        B7: false,
        B8: false,
        ButtonSelection: 0
    })
    .then(() => {alert('Account created successfully!!')})
    .then(() => {alert('Now you can try logging in.')})
    .catch((error) => {alert(error)});
}

function updateLeaderboardFunction()
{
    //console.log('checkpoint'); //

    const dbref = ref(db);

    let TU1 = "";
    let TU2 = "";
    let TU3 = "";
    let TU4 = "";
    let TU5 = "";

    let TS1 = 0;
    let TS2 = 0;
    let TS3 = 0;
    let TS4 = 0;
    let TS5 = 0;

    get(child(dbref, "Leaderboard/"))
    .then((snapshot) => {
        TU1 = snapshot.val().place1Username;
        TU2 = snapshot.val().place2Username;
        TU3 = snapshot.val().place3Username;
        TU4 = snapshot.val().place4Username;
        TU5 = snapshot.val().place5Username;

        TS1 = snapshot.val().place1Score;
        TS2 = snapshot.val().place2Score;
        TS3 = snapshot.val().place3Score;
        TS4 = snapshot.val().place4Score;
        TS5 = snapshot.val().place5Score;
    })

    get(child(dbref, "Users/"))
    .then((snapshot) => {
        if (snapshot.exists())
        {
            snapshot.forEach((child) => {
                console.log(child.val().Username);
                console.log(child.val().Score);

                if (child.val().Score >= TS1)
                {
                    TS1 = child.val().Score;
                    TU1 = child.val().Username;
                }

                else if (child.val().Score >= TS2)
                {
                    TS2 = child.val().Score;
                    TU2 = child.val().Username;
                }

                else if (child.val().Score >= TS3)
                {
                    TS3 = child.val().Score;
                    TU3 = child.val().Username;
                }

                else if (child.val().Score >= TS4)
                {
                    TS4 = child.val().Score;
                    TU4 = child.val().Username;
                }

                else if (child.val().Score >= TS5)
                {
                    TS5 = child.val().Score;
                    TU5 = child.val().Username;
                }
            })

            update(ref(db, "Leaderboard"), {
                place1Username: TU1,
                place1Score: TS1,
                place2Username: TU2,
                place2Score: TS2,
                place3Username: TU3,
                place3Score: TS3,
                place4Username: TU4,
                place4Score: TS4,
                place5Username: TU5,
                place5Score: TS5,
            })
            .then(() => {updateLeaderboardHelperFunction(TU1, TS1, TU2, TS2, TU3, TS3, TU4, TS4, TU5, TS5)})
            .catch((error) => {alert(error)});
        }

        else
        {
            alert('snapshot doesnt exist');
        }

    })
    .catch((error) => {alert(error)});
}

function updateLeaderboardHelperFunction(u1, s1, u2, s2, u3, s3, u4, s4, u5, s5)
{
    leaderPlayer1.innerHTML = "#1: " + u1 + "  -  " + s1;
    leaderPlayer2.innerHTML = "#2: " + u2 + "  -  " + s2;
    leaderPlayer3.innerHTML = "#3: " + u3 + "  -  " + s3;
    leaderPlayer4.innerHTML = "#4: " + u4 + "  -  " + s4;
    leaderPlayer5.innerHTML = "#5: " + u5 + "  -  " + s5;
}

function updatePersonalScoreFunction()
{
     let localPersonalScore = JSON.parse(localStorage.getItem('localPersonalScore'));

    update(ref(db, "Users/" + localStorage.getItem('localUsername')), {
        Username: localStorage.getItem('localUsername'),
        Password: localStorage.getItem('localPassword'),
        Score: localPersonalScore,
        B1: localStorage.getItem('B1Status'),
        B2: localStorage.getItem('B2Status'),
        B3: localStorage.getItem('B3Status'),
        B4: localStorage.getItem('B4Status'),
        B5: localStorage.getItem('B5Status'),
        B6: localStorage.getItem('B6Status'),
        B7: localStorage.getItem('B7Status'),
        B8: localStorage.getItem('B8Status')
    })
    .then(() => {localPersonalScore++})
    .then(() => {localStorage.setItem('localPersonalScore', JSON.stringify(localPersonalScore))})
    .then(() => {playerScore.innerHTML = localPersonalScore})
    .then(() => unlockButtons(localPersonalScore))
    .then(() => playSoundEffect(parseInt(localStorage.getItem('buttonSelection'))))
    .catch((error) => {alert(error)});
}

function unlockButtons(localPersonalScore)
{
    if (localPersonalScore >= 100)
    {
        localStorage.setItem('B1Status', "true");
    }

    if (localPersonalScore >= 777)
    {
        localStorage.setItem('B2Status', "true");
    }

    if (localPersonalScore >= 5000)
    {
        localStorage.setItem('B3Status', "true");
    }

    if (localPersonalScore >= 12345)
    {
        localStorage.setItem('B4Status', "true");
    }

    if (localPersonalScore >= 31415)
    {
        localStorage.setItem('B5Status', "true");
    }

    if (localPersonalScore >= 789789)
    {
        localStorage.setItem('B6Status', "true");
    }

    if (localPersonalScore >= 1000000)
    {
        localStorage.setItem('B7Status', "true");
    }

    if (localPersonalScore >= 7272003)
    {
        localStorage.setItem('B8Status', "true");
    }
}

function selectNewButton(newButton)
{
    if (newButton === 1)
    {
        localStorage.setItem('buttonSelection', 1);

        update(ref(db, "Users/" + localStorage.getItem('localUsername')), {
            ButtonSelection: localStorage.getItem('buttonSelection')
        })
        .catch((error) => {alert(error)});
    }

    else if (newButton === 2)
    {
        localStorage.setItem('buttonSelection', 2);

        update(ref(db, "Users/" + localStorage.getItem('localUsername')), {
            ButtonSelection: localStorage.getItem('buttonSelection')
        })
        .catch((error) => {alert(error)});
    }

    else if (newButton === 3)
    {
        localStorage.setItem('buttonSelection', 3);

        update(ref(db, "Users/" + localStorage.getItem('localUsername')), {
            ButtonSelection: localStorage.getItem('buttonSelection')
        })
        .catch((error) => {alert(error)});
    }

    else if (newButton === 4)
    {
        localStorage.setItem('buttonSelection', 4);

        update(ref(db, "Users/" + localStorage.getItem('localUsername')), {
            ButtonSelection: localStorage.getItem('buttonSelection')
        })
        .catch((error) => {alert(error)});
    }

    else if (newButton === 5)
    {
        localStorage.setItem('buttonSelection', 5);

        update(ref(db, "Users/" + localStorage.getItem('localUsername')), {
            ButtonSelection: localStorage.getItem('buttonSelection')
        })
        .catch((error) => {alert(error)});
    }

    else if (newButton === 6)
    {
        localStorage.setItem('buttonSelection', 6);

        update(ref(db, "Users/" + localStorage.getItem('localUsername')), {
            ButtonSelection: localStorage.getItem('buttonSelection')
        })
        .catch((error) => {alert(error)});
    }

    else if (newButton === 7)
    {
        localStorage.setItem('buttonSelection', 7);

        update(ref(db, "Users/" + localStorage.getItem('localUsername')), {
            ButtonSelection: localStorage.getItem('buttonSelection')
        })
        .catch((error) => {alert(error)});
    }

    else if (newButton === 8)
    {
        localStorage.setItem('buttonSelection', 8);

        update(ref(db, "Users/" + localStorage.getItem('localUsername')), {
            ButtonSelection: localStorage.getItem('buttonSelection')
        })
        .catch((error) => {alert(error)});
    }
}

function playSoundEffect(effectNum)
{
    if (effectNum === 1)
    {
        soundeffect1.play();
    }

    else if (effectNum === 2)
    {
        soundeffect2.play();
    }

    else if (effectNum === 3)
    {
        soundeffect3.play();
    }

    else if (effectNum === 4)
    {
        soundeffect4.play();
    }

    else if (effectNum === 5)
    {
        soundeffect5.play();
    }

    else if (effectNum === 6)
    {
        soundeffect6.play();
    }

    else if (effectNum === 7)
    {
        soundeffect7.play();
    }

    else if (effectNum === 8)
    {
        soundeffect8.play();
    }
}

function refreshStore()
{
    if (localStorage.getItem('B1Status') === 'true')
    {
        storeB1Status.innerHTML = 'UNLOCKED';      
        storeB1.addEventListener('click', function () {selectNewButton(1);});
        storeB1.addEventListener('click', function () {playSoundEffect(1);});
    }

    if (localStorage.getItem('B2Status') === 'true')
    {
        storeB2Status.innerHTML = 'UNLOCKED';
        storeB2.addEventListener('click', function () {selectNewButton(2);});
        storeB2.addEventListener('click', function () {playSoundEffect(2);});
    }

    if (localStorage.getItem('B3Status') === 'true')
    {
        storeB3Status.innerHTML = 'UNLOCKED';
        storeB3.addEventListener('click', function () {selectNewButton(3);});
        storeB3.addEventListener('click', function () {playSoundEffect(3);});
    }

    if (localStorage.getItem('B4Status') === 'true')
    {
        storeB4Status.innerHTML = 'UNLOCKED';
        storeB4.addEventListener('click', function () {selectNewButton(4);});
        storeB4.addEventListener('click', function () {playSoundEffect(4);});
    }

    if (localStorage.getItem('B5Status') === 'true')
    {
        storeB5Status.innerHTML = 'UNLOCKED';
        storeB5.addEventListener('click', function () {selectNewButton(5);});
        storeB5.addEventListener('click', function () {playSoundEffect(5);});
    }

    if (localStorage.getItem('B6Status') === 'true')
    {
        storeB6Status.innerHTML = 'UNLOCKED';
        storeB6.addEventListener('click', function () {selectNewButton(6);});
        storeB6.addEventListener('click', function () {playSoundEffect(6);});
    }

    if (localStorage.getItem('B7Status') === 'true')
    {
        storeB7Status.innerHTML = 'UNLOCKED';
        storeB7.addEventListener('click', function () {selectNewButton(7);});
        storeB7.addEventListener('click', function () {playSoundEffect(7);});
    }

    if (localStorage.getItem('B8Status') === 'true')
    {
        storeB8Status.innerHTML = 'UNLOCKED';
        storeB8.addEventListener('click', function () {selectNewButton(8);});
        storeB8.addEventListener('click', function () {playSoundEffect(8);});
    }
}

function updateButtonStyling()
{
    mainButton.classList.remove('B1-design');
    mainButton.classList.remove('B2-design');
    mainButton.classList.remove('B3-design');
    mainButton.classList.remove('B4-design');
    mainButton.classList.remove('B5-design');
    mainButton.classList.remove('B6-design');
    mainButton.classList.remove('B7-design');
    mainButton.classList.remove('B8-design');

    gamescreenBackground.classList.remove('background-color1');
    gamescreenBackground.classList.remove('background-color2');
    gamescreenBackground.classList.remove('background-color3');
    gamescreenBackground.classList.remove('background-color4');
    gamescreenBackground.classList.remove('background-color5');
    gamescreenBackground.classList.remove('background-color6');
    gamescreenBackground.classList.remove('background-color7');
    gamescreenBackground.classList.remove('background-color8');

    let currentButtonSelection = localStorage.getItem('buttonSelection');

    if (currentButtonSelection === '1')
    {
        mainButton.classList.add('B1-design');
        gamescreenBackground.classList.add('background-color1');
    }
    
    else if (currentButtonSelection === '2')
    {
        mainButton.classList.add('B2-design');
        gamescreenBackground.classList.add('background-color2');
    }

    else if (currentButtonSelection === '3')
    {
        mainButton.classList.add('B3-design');
        gamescreenBackground.classList.add('background-color3');
    }

    else if (currentButtonSelection === '4')
    {
        mainButton.classList.add('B4-design');
        gamescreenBackground.classList.add('background-color4');
    }

    else if (currentButtonSelection === '5')
    {
        mainButton.classList.add('B5-design');
        gamescreenBackground.classList.add('background-color5');
    }

    else if (currentButtonSelection === '6')
    {
        mainButton.classList.add('B6-design');
        gamescreenBackground.classList.add('background-color6');
    }

    else if (currentButtonSelection === '7')
    {
        mainButton.classList.add('B7-design');
        gamescreenBackground.classList.add('background-color7');
    }

    else if (currentButtonSelection === '8')
    {
        mainButton.classList.add('B8-design');
        gamescreenBackground.classList.add('background-color8');
    }
}

if (loginButton)
{
    loginButton.addEventListener('click', loginFunction);
}

if (signupButton)
{
    signupButton.addEventListener('click', signupFunction);
}

if (mainButton)
{
    mainButton.addEventListener('click', updatePersonalScoreFunction);
    mainButton.addEventListener('click', updateLeaderboardFunction);
}

if (updateButtonStylingButton)
{
    updateButtonStylingButton.addEventListener('click', updateButtonStyling);
}

if (storeRefreshButton)
{
    storeRefreshButton.addEventListener('click', refreshStore);
}