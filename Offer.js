

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
window.onload = refresh


function reloadafter(){
    refresh()
    
    setTimeout(function() {
        //your code here
        window.location.reload()
        }, 5000);
   
    
}



function refresh(){
    console.log("called");
    // var database_ref = database.ref()
    // var inp = document.getElementById('assign_text').value
    var ref = database.ref("Inquiry Task");
    console.log('DOne');
    ref.on("value", function(snapshot){
        console.log('DOne');
        snapshot.forEach(function(childSnapshot){
            console.log('DOne');
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
        // setTimeout(function() {
        //     //your code here
        //     window.location.reload()
        //     }, 5000);
    
}