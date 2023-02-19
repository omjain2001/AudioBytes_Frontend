const { initializeApp } = require("firebase/app");
const { ...firebaseStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyC9LkIhBgAENrKiS8zbDUM_yaaCBTlb6Wg",
  authDomain: "audiobytes-1277b.firebaseapp.com",
  projectId: "audiobytes-1277b",
  storageBucket: "gs://audiobytes-1277b.appspot.com",
  messagingSenderId: "339933032398",
  appId: "1:339933032398:web:f0fcabd38cf0978ff8859f",
};

const app = initializeApp(firebaseConfig);
const storage = firebaseStorage.getStorage(app);

module.exports = {
  app,
  storage,
  firebaseStorage,
};
