let loginedID = 0;
function getUsersList() {
    return JSON.parse(localStorage.getItem("users")) ?? [];
}
function allowUsername(username) {
    let users = getUsersList();
    if (users.some(user => user.username === username)) {
        return 1;
    } else if (username.includes(" ")) {
        return 2;
    } else if (username.length < 3) {
        return 3;
    } else return;
}
function allowPassword(password) {
    if (password.length < 8) {
        return 1;
    } else if (password.length > 25) {
        return 2;
    } else if (!password.match(/[A-Z]/)) {
        return 3;
    } else if (!password.match(/[a-z]/)) {
        return 4;
    } else if (!password.match(/[0-9]/)) {
        return 5;
    } else if (password.includes(" ")) {
        return 6;
    } else if (password !== document.getElementById("registerConfirmPassword").value) {
        return 7;
    } else return;
}
function allowFullname(fullName) {
    if (fullName.length == 0) {
        return 1;
    } else if (fullName.match(/[0-9]/)) {
        return 2;
    } else {
        return;
    }
}
function allowAge(age) {
    if (isNaN(age)) {
        return 1;
    }
    else if (age < 18) {
        return 2;
    } else if (age > 100) {
        return 3;
    } else {
        return;
    }
}
function allowEmail(email) {
    let users = getUsersList();
    if (!(email.includes("@") && email.includes(".") && email.indexOf("@") < email.lastIndexOf(".") && email.indexOf("@") > 0 && email.lastIndexOf(".") < email.length - 1)) {
        return 1;
    }
    else if ((users.some(user => user.email === email))) {
        return 2;
    } else return;
}
function registerUser() {
    const user = {
        id: 0,
        username: " ",
        fullName: " ",
        password: " ",
        email: " ",
        age: 0
    };
    let unchangedValues = 5;
    let username = document.getElementById("registerUsername").value;
    switch (allowUsername(username)) {
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
    let password = document.getElementById("registerPassword").value;
    switch (allowPassword(password)) {
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
        case 6:
            alert("Your password may not contain any spaces.");
            break;
        case 7:
            alert("Your password and confirm password should be the same.");
            break;
        default:
            user.password = password;
            unchangedValues--;
    }
    let fullName = document.getElementById("registerFullName").value;
    switch (allowFullname(fullName)) {
        case 1:
            alert("Your full name may not be empty.");
            break;
        case 2:
            alert("Your full name may not contain any digits.");
            break;
        default:
            user.fullName = fullName;
            unchangedValues--;
    }
    let email = document.getElementById("registerEmail").value;
    switch (allowEmail(email)) {
        case 1:
            alert("Your email is invalid.");
            break;
        case 2:
            alert("You are not allowed to register to more than 1 account with 1 email adress.");
            break;
        default:
            user.email = email;
            unchangedValues--;
    }
    let age = parseInt(document.getElementById("registerAge").value);
    switch (allowAge(age)) {
        case 1:
            alert("Entered age is invalid.");
            break;
        case 2:
            alert("You must be at least 18 years old to register.");
            break;
        case 3:
            alert("Your age is too high, people of such age are probably already retired.");
            break;
        default:
            user.age = age;
            unchangedValues--;
    }
    if (unchangedValues == 0) {
        let users = getUsersList();
        do {
            user.id = Math.floor(Math.random() * 100000);
        } while (users.some(checkId => checkId.id === user.id))
        users.push(user);
        const jsonData = JSON.stringify(users, null, 2);
        localStorage.setItem("users", jsonData);
        alert("User was saved to the local storge.");
        document.getElementById("registerScreen").classList.add("undisplay");
        document.getElementById("firstScreen").classList.remove("undisplay");
    }
    else {
        alert("Please correct the errors and try again.");
    }
}
function loginUser() {
    let users = getUsersList();
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    let user = users.find(user => user.username === username);
    if (user) {
        if (user.password === password) {
            loginedID = user.id;
            document.getElementById("loginUsername").value=null;
            document.getElementById("loginPassword").value=null;
            document.getElementById("loginScreen").classList.add("undisplay");
            document.getElementById("loginedUserScreen").classList.remove("undisplay");
        } else {
            alert("This password is incorrect.");
        }
    } else {
        alert("Username was not found.");
    }
}
function showUsers() {
    let users = getUsersList();
    let usersList = document.getElementById("usersList");
    usersList.innerHTML = "";
    users.forEach(user => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `ID: ${user.id} <br>Username: ${user.username}  <br>Full Name: ${user.fullName}  <br>Email: ${user.email}  <br>Age: ${user.age}<br><br><br>`;
        usersList.appendChild(listItem);
    });
}
function showUser() {
    let users = getUsersList();
    let userDefiner = document.getElementById("userDefiner").value;
    let user = users.find(user => user.username === userDefiner || user.id === parseInt(userDefiner));
    if (user) {
        let usersList = document.getElementById("userShower");
        usersList.innerHTML = "";
        let listItem = document.createElement("li");
        listItem.innerHTML = `ID: ${user.id} <br>Username: ${user.username}  <br>Full Name: ${user.fullName}  <br>Email: ${user.email}  <br>Age: ${user.age}`;
        usersList.appendChild(listItem);
    } else {
        alert("The user was not found.");
    }
}
function deleteUser() {
    let users = getUsersList();
    let userDefiner = document.getElementById("deleteUserInput").value;
    let userIndex = users.findIndex(user => user.username === userDefiner || user.id === parseInt(userDefiner));
    if (userIndex !== -1) {
        if (users[userIndex].id == loginedID) {
            alert("You cannod delete your own account.");
        }
        else {
            users.splice(userIndex, 1);
            const jsonData = JSON.stringify(users, null, 2);
            localStorage.setItem("users", jsonData);
            alert("User was deleted from the local storge.");
        }
    } else {
        alert("The user was not found.");
    }
}
function returnToFirstScreen(screen) {
    if (screen == loginedUserScreen) {
        loginedID = 0;
    }
    screen.classList.add("undisplay");
    document.getElementById("firstScreen").classList.remove("undisplay");
}
function moveToRegisterScreen() {
    document.getElementById("firstScreen").classList.add("undisplay");
    document.getElementById("registerScreen").classList.remove("undisplay");
}
function moveToLoginScreen() {
    document.getElementById("firstScreen").classList.add("undisplay");
    document.getElementById("loginScreen").classList.remove("undisplay");
}
function returnToLoginnedScreen(screen) {
    screen.classList.add("undisplay");
    document.getElementById("loginedUserScreen").classList.remove("undisplay");
}
function moveToShowAllUsersScreen() {
    document.getElementById("loginedUserScreen").classList.add("undisplay");
    document.getElementById("showAllUsersScreen").classList.remove("undisplay");
}
function moveToShowUserScreen() {
    document.getElementById("loginedUserScreen").classList.add("undisplay");
    document.getElementById("showUserScreen").classList.remove("undisplay");
}
function moveToDeleteUserScreen() {
    document.getElementById("loginedUserScreen").classList.add("undisplay");
    document.getElementById("deleteUserScreen").classList.remove("undisplay");
}
function clearUsersList(){
    document.getElementById("usersList").innerHTML="";
}
function clearUserShower(){
    document.getElementById("userShower").innerHTML="";
}