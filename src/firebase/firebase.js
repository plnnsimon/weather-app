import firebase from "firebase/app"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyBRJQTLRlaOY5jQHmtqxhmsXx2LvRwqmCU",
    authDomain: "weatherapp-65fba.firebaseapp.com",
    projectId: "weatherapp-65fba",
    storageBucket: "weatherapp-65fba.appspot.com",
    messagingSenderId: "64401913849",
    appId: "1:64401913849:web:19aad567bc8302aac5af28"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();