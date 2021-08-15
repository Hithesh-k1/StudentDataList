import  firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAYG98-KP-cLT9efCbNbWA7XXgbIm-fZ9U",
  authDomain: "studentdatalist-cd009.firebaseapp.com",
  databaseURL: "https://studentdatalist-cd009-default-rtdb.firebaseio.com",
  projectId: "studentdatalist-cd009",
  storageBucket: "studentdatalist-cd009.appspot.com",
  messagingSenderId: "547774033115",
  appId: "1:547774033115:web:0a3a02a155a4f91685b0fe",
  measurementId: "G-X3HYD4X52E",
};
// Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export default fireDb.database().ref();
