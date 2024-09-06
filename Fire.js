import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9xl6NBNcirYbYEnVbnLYUSerD37lAnkk",
  authDomain: "todoapp-39c94.firebaseapp.com",
  projectId: "todoapp-39c94",
  storageBucket: "todoapp-39c94.appspot.com",
  messagingSenderId: "631333258609",
  appId: "1:631333258609:web:11b08461cea46b1673a2d0",
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

class Firedeneme {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    onAuthStateChanged(auth, (user) => {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          callback(null, user);
        } else {
          firebase
            .auth()
            .signInAnonymously()
            .catch((error) => {
              callback(error);
            });
        }
      });
    });
  }

  init(callback) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        callback(null, user);
      } else {
        signInAnonymously(auth).catch((error) => {
          callback(error);
        });
      }
    });
  }
}

export default Firedeneme;
