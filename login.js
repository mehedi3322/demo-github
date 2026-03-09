function loginUser(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

if(username === "admin" && password === "admin123"){

window.location.href = "issue.html";

}
else{

alert("Invalid Username or Password");

}

}