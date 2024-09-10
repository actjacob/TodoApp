import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyA9xl6NBNcirYbYEnVbnLYUSerD37lAnkk",
  authDomain: "todoapp-39c94.firebaseapp.com",
  databaseURL: "https://todoapp-39c94-default-rtdb.firebaseio.com",
  projectId: "todoapp-39c94",
  storageBucket: "todoapp-39c94.appspot.com",
  messagingSenderId: "631333258609",
  appId: "1:631333258609:web:eec92067c3fd771173a2d0",
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firestore ve Auth servislerini başlat
const db = getFirestore(app);
const auth = getAuth(app);

class Fire1 {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    // Auth durumu değişimini izleme
    onAuthStateChanged(auth, (user) => {
      if (user) {
        callback(null, user);
      } else {
        // Anonim olarak oturum aç
        signInAnonymously(auth)
          .then(() => {
            console.log("Signed in anonymously");
          })
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  // Firestore'dan veri almak için güncellenmiş yöntem
  getLists(callback) {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    if (userId) {
      const db = getFirestore();
      const listsRef = collection(db, "users", userId, "lists");

      this.unsubscribe = onSnapshot(listsRef, (snapshot) => {
        const lists = [];
        snapshot.forEach((doc) => {
          lists.push({ id: doc.id, ...doc.data() });
        });
        callback(null, lists);
      });
    } else {
      callback(new Error("No user is signed in."));
    }
    //   this.unsubscribe = onSnapshot(listsRef, (snapshot) => {
    //     const lists = [];
    //     snapshot.forEach((doc) => {
    //       lists.push({ id: doc.id, ...doc.data() });
    //     });
    //     callback(lists);
    //   });
    // } else {
    //   callback(new Error("No user is signed in."));
    //   try {
    //     const querySnapshot = await getDocs(listsRef);
    //     const lists = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //     callback(null, lists);
    //   } catch (error) {
    //     callback(error);
    //   }
    // } else {
    //   callback(new Error("No user is signed in."));
    // }
  }
}

export { db, auth };
export default Fire1;
