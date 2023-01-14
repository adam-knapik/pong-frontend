import { io } from "socket.io-client";
import "./styles.scss";

const myMessage: HTMLInputElement = document.querySelector("#message");
const submitBtn: HTMLInputElement = document.querySelector("#submit");
const chatMessages: HTMLDivElement = document.querySelector(".chat__messages");

const socket = io("https://lpdqk8-3000.preview.csb.app/");

socket.on("connect", () => {
  console.log("Socket connected", socket.id);

  socket.on("chat-message", (data) => {
    chatMessages.innerHTML +=
      "<span class='chat__serverMessage'>" + data + "</span>";
    //console.log("new message: ", data);
  });

  submitBtn.addEventListener("click", () => {
    socket.emit("chat-message", myMessage.value);
    chatMessages.innerHTML +=
      "<span class='chat__myMessage'>" + myMessage.value + "</span>";
    myMessage.value = "";
    //console.log(myMessage.value);
  });
});
