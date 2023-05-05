var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import io from "../node_modules/socket.io-client";
const roomName = location.pathname.split("/").pop();
const socket = io(`/`, {
    query: { roomName },
});
socket.connect();
const sendButton = document.getElementById("send-comment");
const commentInput = document.getElementById("comment");
const commentsDisplay = document.getElementById("list");
const getTmp = (comment) => {
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
    comments.map((item) => {
        const comment = getTmp(item);
        commentsDisplay === null || commentsDisplay === void 0 ? void 0 : commentsDisplay.insertAdjacentHTML("beforeend", comment);
    });
});
sendButton === null || sendButton === void 0 ? void 0 : sendButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch("/user", {
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
}));
console.log(socket);
//# sourceMappingURL=index.js.map