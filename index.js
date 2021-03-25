const lampDesc = document.querySelector('.main__lamp-desc');

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

