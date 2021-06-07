import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyC-CR3zhq_ECG2yNCtFvQ5iE5Ij-QM7nU8",
    authDomain: "booksanta-adc4e.firebaseapp.com",
    projectId: "booksanta-adc4e",
    storageBucket: "booksanta-adc4e.appspot.com",
    messagingSenderId: "1089974748320",
    appId: "1:1089974748320:web:dc7c04863f8ae695f675c5"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()