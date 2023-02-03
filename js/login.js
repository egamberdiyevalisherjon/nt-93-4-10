import users from "../data/users.js";

const userSelect = document.querySelector("select#user-select");
const loginForm = document.querySelector("form#login-form");

let userId = localStorage.getItem("userId");

if (userId) location.replace("./chat-list.html");

users.forEach((user) => {
  let option = document.createElement("option");
  option.innerText = user.name;
  option.value = user.id;

  userSelect.append(option);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let form = e.target;

  let userId = form[0].value;
  let password = form[1].value;

  let user = users.find((u) => u.id + "" === userId);

  if (user.password !== password) return alert("Invalid Credentials");

  localStorage.setItem("userId", userId);

  location.replace("./chat-list.html");
});
