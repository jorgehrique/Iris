const coresList = 
    ['vermelho', 'verde', 'azul', 'preto', 'amarelo',
     'rosa', 'cinza', 'marom', 'laranja'];

const config = {
    apiKey: "AIzaSyDT6CXv3LzTzgFh6RMJLCdFuF_RSQ7mXI4",
    authDomain: "colordataset.firebaseapp.com",
    databaseURL: "https://colordataset.firebaseio.com",
    projectId: "colordataset",
    storageBucket: "",
    messagingSenderId: "1061997724578"
};

firebase.initializeApp(config);
const database = firebase.database()   

function getFromFirebase(){
    return database
    .ref("/colors/")
    .once("value")
    .then(snapshot => Object.values(snapshot.val()));
}