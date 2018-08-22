// Initialize Firebase
var config = {
    apiKey: "AIzaSyBJJEaHfYRBzdNY2ULwC1sVwzLYuKgWIQM",
    authDomain: "dust-farm.firebaseapp.com",
    projectId: "dust-farm",
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

var db = firebase.firestore();

var linkInput = document.getElementById("link");
linkInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        add();
    }
});

function add() {
    var link = document.getElementById("link").value;

    db.collection("main").add({
            link: link,
            timestamp: Date.now()
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("link").value = "";
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}

db.collection("main").orderBy("timestamp", "asc")
    .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                //console.log(change.doc.id, " => ", change.doc.data());

                var link = change.doc.data().link;

                var newLink = document.createElement("a");
                newLink.innerHTML = link;
                newLink.href = link;

                var list = document.getElementById("list");
                list.prepend(newLink);
            }
        });
    });