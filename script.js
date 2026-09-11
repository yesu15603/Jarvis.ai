/* =========================================
J.A.R.V.I.S - SCRIPT
========================================= */

/* =========================================

1. API KEY
   ========================================= */

let API_KEY = localStorage.getItem("jarvis_key");

if (!API_KEY) {

```
API_KEY = prompt("Enter your Gemini API Key:");

if (API_KEY) {

    API_KEY = API_KEY.trim();

    localStorage.setItem("jarvis_key", API_KEY);

}
```

}

/* =========================================
2. GEMINI MODELS
========================================= */

const MODELS = [
"gemini-3.6-flash",
"gemini-flash-latest"
];

/* =========================================
3. HTML ELEMENTS
========================================= */

const chat = document.getElementById("chat");

const input = document.getElementById("msg");

const sendBtn = document.getElementById("send");

const micBtn = document.getElementById("mic-btn");

/* =========================================
4. GEMINI API
========================================= */

async function callGemini(promptText) {

```
if (!API_KEY) {

    throw new Error(
        "Gemini API Key not provided."
    );

}


let lastErr;


for (const model of MODELS) {

    try {

        const url =
            "https://generativelanguage.googleapis.com/v1beta/models/" +
            model +
            ":generateContent?key=" +
            encodeURIComponent(API_KEY);


        const response = await fetch(url, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                contents: [

                    {
                        parts: [

                            {
                                text: promptText
                            }

                        ]
                    }

                ]

            })

        });


        const data = await response.json();


        if (!response.ok || data.error) {

            lastErr = new Error(

                data.error?.message ||
                "Gemini API request failed."

            );


            if (
                /high demand|temporar|quota|rate|unavailable|no longer available|deprecated/i
                .test(lastErr.message)
            ) {

                continue;

            }


            throw lastErr;

        }


        if (
            !data.candidates ||
            !data.candidates[0] ||
            !data.candidates[0].content ||
            !data.candidates[0].content.parts
        ) {

            throw new Error(
                "Invalid response from Gemini."
            );

        }


        const reply = data.candidates[0]
            .content
            .parts
            .map(part => part.text || "")
            .join("");


        return reply;


    } catch (error) {

        lastErr = error;

    }

}


throw lastErr ||
    new Error("Gemini request failed.");
```

}

/* =========================================
5. ASK GEMINI
========================================= */

async function askGemini(promptText) {

```
add(
    "J.A.R.V.I.S: Thinking...",
    "ai"
);


try {

    const reply =
        await callGemini(promptText);


    const lastMessage =
        chat.lastElementChild;


    lastMessage.innerText =
        "J.A.R.V.I.S: " + reply;


    speak(reply);


} catch (error) {

    const lastMessage =
        chat.lastElementChild;


    lastMessage.innerText =
        "J.A.R.V.I.S: ERROR - " +
        error.message;

}
```

}

/* =========================================
6. SPEECH RECOGNITION
========================================= */

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

let rec = null;

if (SpeechRecognition) {

```
rec = new SpeechRecognition();

rec.lang = "en-US";

rec.continuous = false;

rec.interimResults = false;


rec.onstart = function () {

    micBtn.innerText =
        "LISTENING...";

};


rec.onresult = function (event) {

    const text =
        event.results[0][0].transcript;


    add(
        "YOU: " + text,
        "user"
    );


    askGemini(text);

};


rec.onerror = function (event) {

    console.log(
        "Speech recognition error:",
        event.error
    );


    micBtn.innerText = "🎙️";

};


rec.onend = function () {

    micBtn.innerText = "🎙️";

};


micBtn.onclick = function () {

    try {

        rec.start();

    } catch (error) {

        console.log(error);

    }

};
```

} else {

```
micBtn.onclick = function () {

    add(
        "J.A.R.V.I.S: Voice recognition is not supported in this browser.",
        "ai"
    );

};
```

}

/* =========================================
7. TEXT TO SPEECH
========================================= */

let voices = [];

function loadVoices() {

```
voices =
    speechSynthesis.getVoices();
```

}

loadVoices();

speechSynthesis.onvoiceschanged =
loadVoices;

function speak(text) {

```
if (!("speechSynthesis" in window)) {

    return;

}


speechSynthesis.cancel();


const utterance =
    new SpeechSynthesisUtterance(text);


utterance.rate = 1.05;

utterance.pitch = 0.85;


const voice =
    voices.find(function (voice) {

        return voice.lang
            .toLowerCase()
            .startsWith("en");

    });


if (voice) {

    utterance.voice = voice;

}


speechSynthesis.speak(
    utterance
);
```

}

/* =========================================
8. SEND MESSAGE
========================================= */

function sendMessage() {

```
const text =
    input.value.trim();


if (!text) {

    return;

}


add(
    "YOU: " + text,
    "user"
);


input.value = "";


askGemini(text);
```

}

sendBtn.onclick =
sendMessage;

/* =========================================
9. ENTER KEY
========================================= */

input.addEventListener(
"keydown",
function (event) {

```
    if (event.key === "Enter") {

        sendMessage();

    }

}
```

);

/* =========================================
10. ADD CHAT MESSAGE
========================================= */

function add(text, type) {

```
const div =
    document.createElement("div");


div.className =
    "msg " + type;


div.innerText =
    text;


chat.appendChild(div);


chat.scrollTop =
    chat.scrollHeight;
```

}
