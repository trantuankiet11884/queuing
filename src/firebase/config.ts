// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCX-xXz876MNhB3qXyJrWbQV23fG2RWL9A",
  authDomain: "queuing-system-1ae62.firebaseapp.com",
  projectId: "queuing-system-1ae62",
  storageBucket: "queuing-system-1ae62.appspot.com",
  messagingSenderId: "1087387545813",
  appId: "1:1087387545813:web:6b5c31a094b0386272725c",
  measurementId: "G-BK6LPVYP5M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;