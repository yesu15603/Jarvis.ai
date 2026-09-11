const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const send = document.getElementById("send");
const statusText = document.querySelector(".status");


// Send button
send.addEventListener("click", sendMessage);


// Enter key
input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }

});


function sendMessage() {

    const text = input.value.trim();

    // Don't send empty messages
    if (!text) {
        return;
    }


    // Add user's message
    addMessage("YOU: " + text, "user");


    // Clear input
    input.value = "";


    // Disable button while processing
    send.disabled = true;


    // Change status
    setStatus("PROCESSING...", "#00eaff");


    // Add processing message
    const processingMessage =
        addMessage(
            "J.A.R.V.I.S: Processing...",
            "ai"
        );


    /*
     * FRONTEND DEMO RESPONSE
     *
     * This is currently frontend-only.
     * No API or backend is being called.
     *
     * Replace this section later with:
     *
     * fetch("YOUR_BACKEND_URL/chat", {...})
     */

    setTimeout(function () {

        processingMessage.innerText =
            "J.A.R.V.I.S: Systems online. How may I assist you, Boss?";

        setStatus("ONLINE", "#00ffcc");

        send.disabled = false;

        input.focus();

    }, 1000);
}


/*
 * Add message to chat
 */
function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = "msg " + type;

    message.innerText = text;

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;

    return message;
}


/*
 * Change system status
 */
function setStatus(text, color) {

    if (!statusText) {
        return;
    }

    statusText.innerHTML =
        '<span></span>' + text;

    statusText.style.color = color;

    const dot = statusText.querySelector("span");

    if (dot) {
        dot.style.background = color;
        dot.style.boxShadow =
            "0 0 10px " + color;
    }
}
