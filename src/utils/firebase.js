import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJLLWQhpETBkFvld08QeVqhB6dtxJRykE",
  authDomain: "cap-resourcing.firebaseapp.com",
  databaseURL: "https://cap-resourcing.firebaseio.com",
  projectId: "cap-resourcing",
  storageBucket: "cap-resourcing.appspot.com",
  messagingSenderId: "894246281252",
  appId: "1:894246281252:web:64e1f6a13d5a97c2"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
