let users = [];
function allowUsername(username){
    if(users.includes(username)){
        return 1;
    }else if(username.includes(" ")){
        return 2;
    }else if(username.length < 3){
        return 3;
    }
}
function allowPassword(password){
    if(password.length < 8){
        return 1;
    }else if(password.length > 25){
        return 2;
    }else if(!password.match(/[A-Z]/)){
        return 3;
    }else if(!password.match(/[a-z]/)){
        return 4;
    }else if(!password.match(/[0-9]/)){
        return 5;
    }else return;
}
function allowFullname(fullName){
    if(fullName.length==0){
        return 1;
    }else if(fullName.match(/[0-9]/)){
        return 2;
    }else{
        return;
    }
}
function registerUser(){
    const user = {
        id : 0,
        username : " ",
        fullName : " ",
        password : " ",
        email : " ",
        age : 0
    };
    let unchangedValues = 6;
    username = document.getElementById("username").value;
    switch(allowUsername(username)){
        case 1:
            alert("This username already exists");
            break;
        case 2:
            alert("Your username has to be one word");
            break;
        case 3:
            alert("Your username has to have at least 3 characters");
            break;
        default:
            user.username = username;
            unchangedValues--;
    }
    let password = document.getElementById("password").value;
    switch(allowPassword(password)){
        case 1:
            alert("Your password has to have at least 8 characters");
            break;
        case 2:
            alert("Your password may not be longer than 25 characters, it would be too hard to remember it.");
            break;
        case 3:
            alert("Your password must have at least 1 Uppercase letter.");
            break;
        case 4:
            alert("Your password must have at least 1 Lowercase letter.");
            break;
        case 5:
            alert("Your password must have at least one digit.");
            break;
        default:
            user.password = password;
            unchangedValues--;
    }
    let fullName=document.getElementById("fullName").value;
    switch(allowFullname(fullName)){
        case 1:
            alert("Your full name may not be empty.");
            break;
        case 2:
            alert("Your full name may not contain any digits.");
            break;
        default:
            user.fullName=fullName;
            unchangedValues--;
    }
    let email = document.getElementById("email").value;
    if(email.includes("@") && email.includes(".") && email.indexOf("@") < email.lastIndexOf(".") && email.indexOf(".")==email.lastIndexOf(".") && email.indexOf("@")>0 && email.lastIndexOf(".")<email.length-1){
        alert("Your email is invalid.");
    }else{
        user.email=email;
        unchangedValues--;
    }
    }