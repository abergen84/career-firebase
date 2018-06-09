// import * as firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCr2Jf7kBAE4auiZW4z1nWEFGch_yR0jwI",
  authDomain: "hustle-gigs.firebaseapp.com",
  databaseURL: "https://hustle-gigs.firebaseio.com",
  projectId: "hustle-gigs",
  storageBucket: "hustle-gigs.appspot.com",
  messagingSenderId: "645370799919"
};

if(!firebase.apps.length) {
	firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.database()

export {
  auth,
  db
}

