// ===== 1. GEMINI API KEY =====
// First time open ayinappudu API Key adugutundi.
// Key browser localStorage lo save avutundi.

let API_KEY = localStorage.getItem('jarvis_key');

if (!API_KEY) {
    API_KEY = prompt('Enter your Gemini API Key:');

    if (API_KEY) {
        API_KEY = API_KEY.trim();
        localStorage.setItem('jarvis_key', API_KEY);
    }
}


// ===== 2. GEMINI MODELS =====
// First model fail ayite second model try chestundi.

const MODELS = [
    "gemini-3.6-flash",
    "gemini-flash-latest"
];


// ===== 3. HTML ELEMENTS =====

const chat = document.getElementById('chat');
const input = document.getElementById('msg');
const sendBtn = document.getElementById('send');
const micBtn = document.getElementById('mic-btn');


// ===== 4. GEMINI BRAIN =====

async function callGemini(promptText) {

    if (!API_KEY) {
        throw new Error("Gemini API Key is missing.");
    }

    let lastError;

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


            if (data.error) {

                lastError = new Error(
                    data.error.message || "Gemini API error"
                );

                if (
                    /high demand|temporar|quota|rate|unavailable|no longer available|deprecated/i
                    .test(data.error.message || "")
                ) {
                    continue;
                }

                throw lastError;
            }


            const reply =
                data.candidates?.[0]?.content?.parts?.[0]?.text;


            if (!reply) {
                throw new Error("Gemini returned an empty response.");
            }


            return reply;

        } catch (error) {

            lastError = error;

        }
    }


    throw lastError || new Error("Gemini request failed.");
}


// ===== 5. ASK JARVIS =====

async function askGemini(promptText) {

    const thinkingMessage =
        add("J.A.R.V.I.S: Thinking...", "ai");


    try {

        const reply = await callGemini(promptText);


        thinkingMessage.innerText =
            "J.A.R.V.I.S: " + reply;


        // Gemini reply voice lo speak chestundi
        speak(reply);


    } catch (error) {

        thinkingMessage.innerText =
            "J.A.R.V.I.S: ERROR - " +
            error.message;

    }
}


// ===== 6. SPEECH RECOGNITION =====
// Mic nundi voice teesukoni text ga convert chestundi.

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


let rec = null;


if (SpeechRecognition) {

    rec = new SpeechRecognition();

    // English voice recognition
    // Telugu kosam: te-IN
    rec.lang = "en-US";

    rec.continuous = false;

    rec.interimResults = false;


    // ===== MIC START =====

    rec.onstart = function () {

        micBtn.innerText = "🔴";

        micBtn.title = "Listening...";

    };


    // ===== VOICE RESULT =====

    rec.onresult = function (event) {

        const text =
            event.results[0][0].transcript;


        if (!text.trim()) {
            return;
        }


        add(
            "YOU: " + text,
            "user"
        );


        askGemini(text);

    };


    // ===== MIC ERROR =====

    rec.onerror = function (event) {

        console.log(
            "Speech recognition error:",
            event.error
        );

        micBtn.innerText = "🎙️";

        micBtn.title = "Voice input";

    };


    // ===== MIC END =====

    rec.onend = function () {

        micBtn.innerText = "🎙️";

        micBtn.title = "Voice input";

    };


    // ===== MIC BUTTON =====

    micBtn.onclick = function () {

        try {

            rec.start();

        } catch (error) {

            console.log(
                "Microphone start error:",
                error
            );

        }

    };

} else {

    // Browser Speech Recognition support lekapothe

    micBtn.disabled = true;

    micBtn.title =
        "Speech Recognition is not supported in this browser";

}


// ===== 7. TEXT TO SPEECH =====
// JARVIS reply ni voice lo cheptundi.

let voices = [];


function loadVoices() {

    if ("speechSynthesis" in window) {
        voices = speechSynthesis.getVoices();
    }

}


loadVoices();


if ("speechSynthesis" in window) {

    speechSynthesis.onvoiceschanged =
        loadVoices;

}


function speak(text) {

    if (!("speechSynthesis" in window)) {
        return;
    }


    // Existing speech stop chestundi
    speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(text);


    utterance.rate = 1.05;

    utterance.pitch = 0.85;


    // English voice select
    const voice =
        voices.find(
            voice => voice.lang.startsWith("en")
        );


    if (voice) {
        utterance.voice = voice;
    }


    speechSynthesis.speak(utterance);

}


// ===== 8. SEND BUTTON =====

sendBtn.onclick = function () {

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

};


// ===== 9. ENTER KEY =====

input.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendBtn.click();

        }

    }
);


// ===== 10. ADD MESSAGE =====

function add(text, type) {

    const message =
        document.createElement("div");


    message.className =
        "msg " + type;


    message.innerText = text;


    chat.appendChild(message);


    chat.scrollTop =
        chat.scrollHeight;


    return message;

}
