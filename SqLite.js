// import SQLite from "react-native-sqlite-storage";

// const db = SQLite.openDatabase(
//   { name: "todoApp.db", location: "default" },
//   () => {
//     console.log("Database opened successfully");
//   },
//   (error) => {
//     console.log("Error opening database:", error);
//   }
// );

// // Veritabanını oluştur ve tabloları oluştur
// const createTables = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS lists (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         color TEXT NOT NULL
//       )`,
//       [],
//       () => console.log('Table "lists" created successfully'),
//       (tx, error) => console.log('Error creating "lists" table:', error)
//     );
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS todos (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         list_id INTEGER NOT NULL,
//         title TEXT NOT NULL,
//         completed BOOLEAN NOT NULL,
//         FOREIGN KEY (list_id) REFERENCES lists (id)
//       )`,
//       [],
//       () => console.log('Table "todos" created successfully'),
//       (tx, error) => console.log('Error creating "todos" table:', error)
//     );
//   });
// };

// // Veri ekleme
// const addList = (name, color) => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       "INSERT INTO lists (name, color) VALUES (?, ?)",
//       [name, color],
//       (_, result) => console.log("List added successfully", result),
//       (_, error) => console.log("Error adding list:", error)
//     );
//   });
// };

// // Veri çekme
// const getLists = (callback) => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       "SELECT * FROM lists",
//       [],
//       (_, { rows: { _array } }) => callback(_array),
//       (_, error) => console.log("Error fetching lists:", error)
//     );
//   });
// };

// // Örnek kullanım
// createTables();
// addList("My First List", "#FF5733");
// getLists((lists) => console.log("Fetched lists:", lists));

//   getLists(callback) {
//     let ref = this.ref.orderBy("name");

//     this.unsubscribe = ref.onSnapshot((snapshot) => {
//       lists = [];

//       snapshot.forEach((doc) => {
//         lists.push({ id: doc.id, ...doc.data() });
//       });
//       callback(lists);
//     });
//   }

//   addList(list) {
//     let ref = this.ref;

//     ref.add(list);
//   }

//   updateList(list) {
//     let ref = this.ref;

//     ref.doc(list.id).update(list);
//   }

//   get userId() {
//     return firebase.auth().currentUser.uid;
//   }

//   get ref() {
//     return firebase
//       .firestore()
//       .collection("users")
//       .doc(this.userId)
//       .collection("lists");
//   }

//   detach() {
//     this.unsubscribe();
//   }
// }

// import SQLite from "react-native-sqlite-storage";

// class SqLite {
//   constructor(callback) {
//     this.init(callback);
//   }

//   // Veritabanını başlat
//   init(callback) {
//     this.db = SQLite.openDatabase(
//       { name: "todoApp.db", location: "default" },
//       () => {
//         console.log("Database opened");
//         this.createTables(); // Tabloyu başlat
//         callback(null, true); // Callback çağır
//       },
//       (error) => {
//         console.log("Error opening database:", error);
//         callback(error);
//       }
//     );
//   }

//   // Tabloyu oluştur
//   createTables() {
//     this.db.transaction((tx) => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS lists (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           name TEXT NOT NULL,
//           color TEXT NOT NULL
//         )`,
//         [],
//         () => console.log('Table "lists" created'),
//         (error) => console.log('Error creating "lists" table:', error)
//       );
//     });
//   }

//   // Liste alma işlemi
//   getLists(callback) {
//     this.db.transaction((tx) => {
//       tx.executeSql(
//         "SELECT * FROM lists",
//         [],
//         (_, { rows: { _array } }) => {
//           callback(_array); // Veritabanındaki tüm listeyi geri döndür
//         },
//         (_, error) => {
//           console.log("Error fetching lists:", error);
//         }
//       );
//     });
//   }

//   // Liste ekleme işlemi
//   addList(list) {
//     this.db.transaction((tx) => {
//       tx.executeSql(
//         "INSERT INTO lists (name, color) VALUES (?, ?)",
//         [list.name, list.color],
//         (_, result) => {
//           console.log("List added successfully:", result);
//         },
//         (_, error) => {
//           console.log("Error adding list:", error);
//         }
//       );
//     });
//   }

//   // Liste güncelleme işlemi
//   updateList(list) {
//     this.db.transaction((tx) => {
//       tx.executeSql(
//         "UPDATE lists SET name = ?, color = ? WHERE id = ?",
//         [list.name, list.color, list.id],
//         (_, result) => {
//           console.log("List updated successfully:", result);
//         },
//         (_, error) => {
//           console.log("Error updating list:", error);
//         }
//       );
//     });
//   }

//   // Liste silme işlemi (isteğe bağlı)
//   deleteList(listId) {
//     this.db.transaction((tx) => {
//       tx.executeSql(
//         "DELETE FROM lists WHERE id = ?",
//         [listId],
//         (_, result) => {
//           console.log("List deleted successfully:", result);
//         },
//         (_, error) => {
//           console.log("Error deleting list:", error);
//         }
//       );
//     });
//   }

//   // Bağlantıyı kapatma
//   detach() {
//     if (this.db) {
//       this.db.close(
//         () => console.log("Database closed"),
//         (error) => console.log("Error closing database:", error)
//       );
//     }
//   }
// }

// export default SqLite;
