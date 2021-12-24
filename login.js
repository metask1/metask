 var firebaseConfig = {
  apiKey: "AIzaSyDS5jkd3xKYbe29URtj6uD0hdVGU969mdY",
  authDomain: "center-3fd92.firebaseapp.com",
  projectId: "center-3fd92",
  storageBucket: "center-3fd92.appspot.com",
  messagingSenderId: "352464652127",
  appId: "1:352464652127:web:caa9bc9f112de23aa858ea",
  measurementId: "G-14NTWQ1NQ0"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()



function login () {
    // document.getElementById("content_container").hidden = true;
    // document.getElementById("form_content_container2").hidden = false;
    // Get all our input fields
    email = document.getElementById('email_login').value
    password = document.getElementById('password_login').value
    
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Wrong')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      
      var user_data = {
       last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!!')
      if (email == "bhowmicksomen@gmail.com"){
        window.location = "Master.html"
      }
      else if (email != "bhowmicksomen@gmail.com"){
        window.location = "index.html"
      }
     
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
    

  }
  




  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }}

    function check(){
      var ref = database.ref("users");
      ref.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
      
          var data = childSnapshot.val();
          var Type = data.type
          // console.log(Type)
          if (Type == "sir"){
            // window.location = "Master.html"
            console.log("Sir")
          }
          else{
            // window.location = "index.html"
            console.log("staff")
          }
        })
      });
    }
    
    
    
