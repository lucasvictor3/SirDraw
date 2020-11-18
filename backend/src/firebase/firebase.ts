import firebase from 'firebase/app';
import * as dotenv from 'dotenv';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

dotenv.config({
    path: './env/.env'
});

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID
};

export const initializedFirebase = firebase.initializeApp(firebaseConfig);
