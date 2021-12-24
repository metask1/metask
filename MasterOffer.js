var firebaseConfig = {
    apiKey: "AIzaSyDS5jkd3xKYbe29URtj6uD0hdVGU969mdY",
    authDomain: "center-3fd92.firebaseapp.com",
    projectId: "center-3fd92",
    storageBucket: "center-3fd92.appspot.com",
    messagingSenderId: "352464652127",
    appId: "1:352464652127:web:caa9bc9f112de23aa858ea",
    measurementId: "G-14NTWQ1NQ0"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database()
// var inp = document.getElementById('assign_text').value

function assign(){
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
}

window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


function assign_submit(){
    var inp = document.getElementById('assign_text').value
    


    var database_ref = database.ref()
    
    database_ref.child('Inquiry Task/' + inp).set(inp)
    window.location.reload();

   
}
window.onload = refresh()

function refresh(){
    // var inp = document.getElementById('assign_text').value
    var ref = database.ref("Inquiry Task");
    ref.on("value", function(snapshot){
    snapshot.forEach(function(childSnapshot){

        var data = childSnapshot.val();
        console.log(data)
        console.log(data)
        var tag = document.createElement("p");
        var text = document.createTextNode(data);
        tag.appendChild(text);
        var element = document.getElementById("assign_column");
        element.appendChild(tag);
    })
    });
}