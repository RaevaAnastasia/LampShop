const lampDesc = document.querySelector('.main__lamp-desc');
const form = document.querySelector('.main__form-set--top');
const lampImgBig = document.querySelector('.main__lamp-img');
const changedImg = document.querySelector('.main__changed-img');

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
}

function changeSmallImg(id) {
    changedImg.src = `img/${id}.png`;
}


async function handleClick(event) {
    event.preventDefault();
    let id = event.target.getAttribute('for');
    let lamp = await getLampData(id);
    addDescription(lamp);
    changeBigImg(id);
    changeSmallImg(id);
}

form.addEventListener('click', handleClick);