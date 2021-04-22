import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCRmEPexDjNFxE3IqvIW0eRSkFX63hPdes",
    authDomain: "envmon-12b11.firebaseapp.com",
    databaseURL: "https://envmon-12b11-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "envmon-12b11",
    storageBucket: "envmon-12b11.appspot.com",
    messagingSenderId: "553540257115",
    appId: "1:553540257115:web:b57d57b85ce73f6cbc467e",
    measurementId: "G-VQYB8MCVKW"
};
const config = firebase.initializeApp(firebaseConfig);
export default config;