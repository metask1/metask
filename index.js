var User = localStorage.getItem('User')

function Inquiry(){
    if(User != null){
        window.location = 'inquiry.html'
    }
    else{
        window.alert("Please Login Or Register First")
    }
    
}
function Order(){
    if(User != null){
        window.location = 'offer.html'
    }
    else{
        window.alert("Please Login Or Register First")
    }
}
function Offer(){
    if(User != null){
        window.location = 'Offer.html'
    }
    else{
        window.alert("Please Login Or Register First")
    }
}
function login(){
    window.location = "login.html"
}
function register(){
    window.location = "register.html"
}
function home(){
    window.location = "index.html"
}
