import { initializeApp, getApp } from 'firebase/app';
// import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase} from'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAcXRTebgKdw9jh0zIA6-dklYcKTd4rU_A",
    authDomain: "fans-del-cartel.firebaseapp.com",
    projectId: "fans-del-cartel",
    storageBucket: "fans-del-cartel.appspot.com",
    messagingSenderId: "767068644787",
    appId: "1:767068644787:web:99528ece2231768e9e97c6",
    measurementId: "G-V1NBLLVS3C"
    };

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    const database = getDatabase(app);

    //const db = initializeFirestore(app, {experimentalForceLongPolling: true});
    
    export { database, auth };