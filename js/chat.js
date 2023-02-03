import users from "../data/users.js";

const friendProfileImage = document.querySelector("#friend-profile-image");
const friendProfileName = document.querySelector("#friend-profile-name");
const friendProfileStatus = document.querySelector("#friend-profile-status");
const messagesWrapper = document.querySelector("#messages-wrapper");
const newMessageForm = document.querySelector("#new-message-form");
const logoutBtn = document.querySelector("#logout-btn");

let userId = localStorage.getItem("userId");

if (!userId) location.replace("./login.html");

let friendId = location.hash.slice(1);

if (!friendId) location.replace("./chat-list.html");

let friend = users.find((u) => u.id + "" === friendId);

document.title = `Najotgram | Chat with ${friend.name}`;

friendProfileImage.setAttribute("src", friend.image);
friendProfileImage.setAttribute("alt", friend.name);

friendProfileName.innerText = friend.name;

if (friend.status === "online") {
  friendProfileStatus.innerText = "online";
  friendProfileStatus.classList.add("text-success");
} else {
  friendProfileStatus.innerText = `last seen ${friend.status}`;
  friendProfileStatus.classList.add("text-secondary");
}

let chats = JSON.parse(localStorage.getItem("chats") || "[]");

let chat = chats.find(
  (ch) => ch.members.includes(userId) && ch.members.includes(friendId)
);

if (!chat && userId && friendId) {
  chat = {
    members: [userId, friendId],
    messages: [],
  };

  chats.push(chat);

  localStorage.setItem("chats", JSON.stringify(chats));
}

function renderMessages() {
  messagesWrapper.innerHTML = "";

  chat.messages.forEach((message) => {
    let template = `
    <div class="message ${
      message.fromId + "" === userId + ""
        ? "text-bg-primary message-from-me align-self-end"
        : "text-bg-light message-to-me align-self-start"
    }">
      <span class="text">${message.text}</span>
      <span class="date">${message.time}</span>
    </div>
  `;

    messagesWrapper.innerHTML += template;
  });

  messagesWrapper.scroll({ top: messagesWrapper.scrollHeight });
}

renderMessages();

newMessageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let text = e.target[0].value;

  if (!text) return;

  let date = new Date();
  let time = `${(date.getHours() + "").padStart(2, "0")}:${(
    date.getMinutes() + ""
  ).padStart(2, "0")}`;

  let message = {
    text: text.split(" ").slice(0, 100).join(" "),
    time,
    fromId: userId,
  };

  chat.messages.push(message);

  localStorage.setItem("chats", JSON.stringify(chats));
  renderMessages();

  e.target.reset();
});

logoutBtn.addEventListener("click", () => {
  if (confirm("Tochna logout qilasizmi?")) {
    localStorage.removeItem("userId");
    location.replace("./login.html");
  }
});
