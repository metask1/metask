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

const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    number = document.getElementById('number').value
    if (full_name == "Somen Bhowmick" & email == "bhowmicksomen@gmail.com"){
      type = "sir";
    }
    else if (full_name != "Somen Bhowmick" & email !="bhowmicksomen@gmail.com"){
      type = "staff";
    }



    
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
   
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        number : number,
        type : type
        

      }
  
      // Push to Firebase Database
      database_ref.child('users/' + full_name).set(user_data)
  
      // DOne
      alert('Registered Succesfully')
      setTimeout(function() {
        //your code here
        window.location = "login.html"
       }, 5000);
      // window.location = "login.html"
      
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
    
      // document.getElementById("content_container").style.display = "none";
      // document.getElementById("form_content_container2").style.display = "block";

  }

  
  
  // Set up our login function
  
  
  
  
  
  // Validate Functions
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
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }



