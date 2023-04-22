const firebase = require("firebase");
const bancodedados = require("shorten-firebase.realtime-database");

const firebaseConfig = {
    apiKey: "AIzaSyBI9c3XGuq7tQO3aZ-5Iv5XjWu38BxmwYs",
    authDomain: "snakeshopautorizacao.firebaseapp.com",
    projectId: "snakeshopautorizacao",
    storageBucket: "snakeshopautorizacao.appspot.com",
    messagingSenderId: "513181627396",
    appId: "1:513181627396:web:f618d9f320608c0b3d7151",
};

try {
    firebase.initializeApp(firebaseConfig);
    console.log("Conectado ao banco de dados!");
} catch (err) {
    console.log(err);
}
const database = new bancodedados(firebase, false);

module.exports = {
    database,
    firebase,
};
