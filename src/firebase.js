import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD2gM08_nCqV3hXlRgLvzbZG1N-_7IuXlA",
    authDomain: "crud-fb-72fca.firebaseapp.com",
    databaseURL: "https://crud-fb-72fca-default-rtdb.firebaseio.com",
    projectId: "crud-fb-72fca",
    storageBucket: "crud-fb-72fca.appspot.com",
    messagingSenderId: "664907562186",
    appId: "1:664907562186:web:dd8ba5fb70782adc058833"
};

// Initialize Firebase
const fireDB = firebase.initializeApp(firebaseConfig);
export default fireDB.database().ref();