import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// firebase API, nothing's harmful GitGuardian :)

const config = {
  apiKey: "AIzaSyDTvxNT3_rRd1i6bqE03v8JQ-8qTNpjquQ",
  authDomain: "crwn-db-3ca54.firebaseapp.com",
  databaseURL: "https://crwn-db-3ca54.firebaseio.com",
  projectId: "crwn-db-3ca54",
  storageBucket: "crwn-db-3ca54.appspot.com",
  messagingSenderId: "395633497688",
  appId: "1:395633497688:web:4adf5b00eda65046611c2d",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;