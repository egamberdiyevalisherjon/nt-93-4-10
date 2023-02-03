import users from "../data/users.js";

let userId = localStorage.getItem("userId");

if (!userId) location.replace("./login.html");

let friendId = location.hash.slice(1);

if (!friendId) location.replace("./chat-list.html");

// navigator.connection.onchange = function (e) {
//   console.log(e);
// }
