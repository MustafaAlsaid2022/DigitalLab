import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

//const settings = {timestampsInSnapshots: true}

const app = firebase.initializeApp({
    apiKey: "AIzaSyBygnnKRSElhZcbJakVq-YfpmCWgBe4O2I",
    authDomain: "react-firebase-app-7bee5.firebaseapp.com",
    databaseURL: "https://react-firebase-app-7bee5.firebaseio.com",
    projectId: "react-firebase-app-7bee5",
    storageBucket: "react-firebase-app-7bee5.appspot.com",
    messagingSenderId: "152952141446",
    appId: "1:152952141446:web:f6cd2317568ea7f0614307"
  
});
 export const auth = app.auth();
// firebase.firestore().settings(settings);

 export default app


