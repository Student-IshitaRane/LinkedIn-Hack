import "./index.scss";
import { io } from "socket.io-client";
import Experience from "./Experience/Experience.js";
import elements from "./Experience/Utils/functions/elements.js";

// DOM Elements ----------------------------------

const domElements = elements({
    canvas: ".experience-canvas",
    chatContainer: ".chat-container",
    messageSubmitButton: "#chat-message-button",
    messageInput: "#chat-message-input",
    inputWrapper: ".message-input-wrapper",
    nameInputButton: "#name-input-button",
    nameInput: "#name-input",
    customizeButton: ".customize-character-btn", // 👈 Make sure this exists
});

// Socket Setup ----------------------------------

const socketUrl = new URL("/", window.location.href);

const chatSocket = io(socketUrl.toString() + "chat");
const updateSocket = io(socketUrl.toString() + "update");

let userName = "";

// Experience ------------------------------------

const experience = new Experience(domElements.canvas, updateSocket);

// Sockets ---------------------------------------

chatSocket.on("connect", () => {
    console.log("Chat socket connected:", chatSocket.id);
});

updateSocket.on("connect", () => {
    console.log("Update socket connected:", updateSocket.id);
});

// Event Listeners -------------------------------

domElements.messageSubmitButton.addEventListener("click", handleMessageSubmit);
domElements.nameInputButton.addEventListener("click", handleNameSubmit);
domElements.chatContainer.addEventListener("click", handleChatClick);
domElements.customizeButton.addEventListener("click", handleAvatarSelection); // ✅

document.addEventListener("keydown", (event) => {
    if (event.target === domElements.messageInput && event.key === "Enter") {
        handleMessageSubmit(event);
    }
});

// Handlers --------------------------------------

function handleChatClick() {
    domElements.inputWrapper.classList.remove("hidden");
    domElements.messageInput.focus();
}

function handleNameSubmit() {
    const name = domElements.nameInput.value.trim();
    if (!name) return;

    userName = name;
    chatSocket.emit("setName", userName);
    updateSocket.emit("setName", userName);
}

function handleAvatarSelection() {
    if (experience.avatarPath) {
        updateSocket.emit("setAvatar", experience.avatarPath);
        console.log("Avatar sent to server:", experience.avatarPath);
    } else {
        console.warn("No avatarPath found on experience object.");
    }
}

function handleMessageSubmit(event) {
    if (event.type === "click" || event.key === "Enter") {
        const message = domElements.messageInput.value.trim();
        if (!message) return;

        const time = getTime();

        displayMessage(userName, message, time);
        chatSocket.emit("send-message", message, time);

        domElements.messageInput.value = "";
        domElements.inputWrapper.classList.add("hidden");
    }
}

function getTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

function displayMessage(name, message, time) {
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<span class="different-color">[${time}] ${name}:</span> ${message}`;
    domElements.chatContainer.appendChild(messageDiv);
    domElements.chatContainer.scrollTop = domElements.chatContainer.scrollHeight;
}

// Chat Receive ----------------------------------

chatSocket.on("recieved-message", (name, message, time) => {
    displayMessage(name, message, time);
});

// Optional: Audio Toggle (M key) ----------------

const audio = document.getElementById("myAudio");
window.addEventListener("keydown", function (e) {
    if (e.code === "Equal") {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        } else {
            audio.play();
        }
    }
});
