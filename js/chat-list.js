import users from "../data/users.js";

const chatsUl = document.querySelector("#chats-ul");

let userId = localStorage.getItem("userId");

if (!userId) location.replace("./login.html");

users.forEach((u) => {
  if (u.id + "" !== userId) {
    let li = document.createElement("li");
    let img = document.createElement("img");
    let a = document.createElement("a");

    li.classList.add("list-group-item", "text-bg-dark", "fs-1");

    img.setAttribute("src", u.image);
    img.setAttribute("alt", u.name);

    a.classList.add("text-reset", "text-decoration-none");
    a.setAttribute("href", `./chat.html#${u.id}`);
    a.innerText = u.name;

    li.append(img, a);
    chatsUl.append(li);
  }
});

/*
 <li>
          <a class="" href="./chat.html#1"
            >Elon Musk</a
          >
        </li>
*/
