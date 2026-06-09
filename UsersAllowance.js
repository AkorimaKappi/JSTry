let users = [];
function allowUsername(username){
    if(users.includes(username)){
        return 1;
    }else if(username.includes(" ")){
        return 2;
    }else if(username.length < 3){
        return 3;
    }else{
        return 4;
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
    }else{
        return 6;
    }
}
function registerUser(){
    let username = document.getElementById("username").value;
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
        case 4:
            users.push(username);
            break;
    }
    let password = document.getElementById("password").value;
    switch(allowPassword(password)){
        case 1:
            alert("Your password has to have at least 8 characters");
            break;
        case 2:
            alert("Your password may not be longer than 25 characters, it would be too hard to remember it.");
    }
    let email = document.getElementById("email").value;
}