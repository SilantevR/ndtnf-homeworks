import { io, Socket } from "socket.io-client";
import { Comment } from "../types";

const roomName = location.pathname.split("/").pop();
const socket: Socket = io(`/`, { query: { roomName } });

socket.connect();

const sendButton = document.getElementById("send-comment");
const commentInput = document.getElementById("comment") as HTMLInputElement;
const commentsDisplay = document.getElementById("list");

const getTmp = (comment: Comment) => {
  return `
            <div class="list-group-item list-group-item-action w-100 p-3">
                <div class="d-flex w-300 justify-content-between">
                    <small>user: ${comment.user.username}</small>
                </div>
                <div class="d-flex w-300 justify-content-between">
                    <small class="text-muted">id: ${comment.user._id}</small>
                </div>
                <p class="mb-1">${comment.comment}</p>
            </div>
    `;
};

socket.on("show-comments", (comments) => {
  commentsDisplay.innerHTML = "";
  comments.map((item: Comment) => {
    const comment = getTmp(item);
    commentsDisplay.insertAdjacentHTML("beforeend", comment);
  });
});

sendButton.addEventListener("click", async () => {
  await fetch("/user", {
    method: "GET",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.username) {
        socket.emit("comment", {
          comment: commentInput.value,
          user: result,
        });
        commentInput.value = "";
      }
      console.log(result.reason);
    })
    .catch((err) => {
      console.log(err);
    });
});

console.log(socket);
