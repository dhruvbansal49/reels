import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/storage'
import 'firebase/firestore'

firebase.initializeApp(
    {
        apiKey: "AIzaSyC5ciGk-4aXpdtr4-iCRXIljZTG9QCCozY",
        authDomain: "reels-1e4ac.firebaseapp.com",
        projectId: "reels-1e4ac",
        storageBucket: "reels-1e4ac.appspot.com",
        messagingSenderId: "868499929585",
        appId: "1:868499929585:web:b25f88ba35c07d328cac50"
      }
)
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection("posts"),
    comments: firestore.collection("comments"),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp // used to tell the
    // time of user when user signed in or signed up
}
export const storage = firebase.storage(); // used for storing images and videos
// export default firebase;
