const lampDesc = document.querySelector('.main__lamp-desc');
const formTopRadio = document.querySelector('.main__form-set--top');
const lampImgBig = document.querySelector('.main__lamp-img');
const changedImg = document.querySelector('.main__changed-img');
const changedImgWrapper = document.querySelector('.main__changed-lamp');
const lampImgBigWrap = document.querySelector('.main__lamp');
const radioLamps = document.querySelectorAll('.main__form-label');
const formBottomRadio = document.querySelector('.main__form-set--bottom');
const imgRoom = document.querySelector('.main__wrapper-img');
const radioLight = document.querySelectorAll('.main__form-lab');

const firebaseConfig = {
    apiKey: "AIzaSyBmstXF59RerQnKuBaoACgK70SHogA1mDg",
    authDomain: "lampshop-303a5.firebaseapp.com",
    projectId: "lampshop-303a5",
    storageBucket: "lampshop-303a5.appspot.com",
    messagingSenderId: "657324544230",
    appId: "1:657324544230:web:fec56078c014bb3968ab27",
    measurementId: "G-5JHMWPLTDL"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

async function getLampData(id) {
    try {
        let lamp = db.collection("lamps").doc(id);
        let doc = await lamp.get();
        if (doc.exists) {
            let data = doc.data();
            return data;
        } else {
            console.log("No such document!");
        } 
    } catch (error) {
        console.log(`"Error getting document:" ${error}`);
    } 
}

function addDescription(lamp) {
    lampDesc.innerHTML = '';
    let newLampDesc =  `<p class="main__desc-item">
        <span class="main__decs-term">Material:</span>
        <span class="main__desc-value">${lamp.material}</span>
    </p>
    <p class="main__desc-item">
        <span class="main__decs-term">Dimensions (cm):</span>
        <span class="main__desc-value">${lamp.dimensions}</span>
    </p>
    <p class="main__desc-item">
        <span class="main__decs-term">Net Weight:</span>
        <span class="main__desc-value">${lamp.weight} kg</span>
    </p>
    <p class="main__desc-item">
        <span class="main__decs-term">Electrification:</span><br>
        <span class="main__desc-value">${lamp.electrification}</span>
    </p>`;
    lampDesc.innerHTML = newLampDesc; 
}

function changeBigImg(id) {
    lampImgBig.src = `img/${id}.png`;
    lampImgBigWrap.classList.add('animation__to-right');
}

function changeSmallImg(id) {
    changedImg.src = `img/${id}.png`;
    changedImgWrapper.classList.add('animation__to-right');
}

function changeLight(target) {
    if (target === 'day') {
        imgRoom.classList.remove('main__wrapper-img--night');
    } else {
        imgRoom.classList.add('main__wrapper-img--night');
    }
}

async function handleClickTop(event) {
    event.preventDefault();
    radioLamps.forEach((item) => item.classList.remove('main__form-label--checked'));
    changedImgWrapper.classList.remove('animation__to-right');
    lampImgBigWrap.classList.remove('animation__to-right');
    lampDesc.classList.remove('animation__to-center');
    event.target.classList.add('main__form-label--checked');
    let id = event.target.getAttribute('for');
    let lamp = await getLampData(id);
    addDescription(lamp);
    changeBigImg(id);
    changeSmallImg(id);
    lampDesc.classList.add('animation__to-center');
}

function handleClickBottom(event) {
    event.preventDefault();
    radioLight.forEach((item) => item.classList.remove('main__form-lab--checked'));
    let target = event.target.getAttribute('for');
    changeLight(target);
    event.target.classList.add('main__form-lab--checked');
}

formTopRadio.addEventListener('click', handleClickTop);
formBottomRadio.addEventListener('click', handleClickBottom);