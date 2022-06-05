import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


export const FIREBASE_APIKEY = process.env.REACT_APP_FIREBASE_APIKEY
export const FIREBASE_AUTHDOMAIN = process.env.REACT_APP_FIREBASE_AUTHDOMAIN
export const FIREBASE_DATABASEURL = process.env.REACT_APP_FIREBASE_DATABASEURL
export const FIREBASE_PROJECTID = process.env.REACT_APP_FIREBASE_PROJECTID
export const FIREBASE_STORAGEBUCKET =process.env.REACT_APP_FIREBASE_STORAGEBUCKET
export const FIREBASE_MESSAGINGSENDERID =process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID
export const FIREBASE_APPID = process.env.REACT_APP_FIREBASE_APPID
export const FIREBASE_MEASUREMENTID =process.env.REACT_APP_FIREBASE_MEASUREMENTID
export const API_URL = process.env.REACT_APP_API_URL

export const firebaseConfig = {
    apiKey: FIREBASE_APIKEY,
    authDomain: FIREBASE_AUTHDOMAIN,
    databaseURL: FIREBASE_DATABASEURL,
    projectId: FIREBASE_PROJECTID,
    storageBucket: FIREBASE_STORAGEBUCKET,
    messagingSenderId: FIREBASE_MESSAGINGSENDERID,
    appId: FIREBASE_APPID,
    measurementId: FIREBASE_MEASUREMENTID
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

// firebase.initializeApp(firebaseConfig);
// firebase.auth();
// export {  firebase};


// export default firebase;