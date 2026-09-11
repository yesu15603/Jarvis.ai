* // ==========================================
// J.A.R.V.I.S
// Episode 04 - THE VOICE
// ==========================================


// ==========================================
// 1. API KEY
// ==========================================

let API_KEY = localStorage.getItem("jarvis_key");

if (!API_KEY) {

  API_KEY = prompt("Enter your Gemini API Key:");

  if (API_KEY) {

    API_KEY = API_KEY.trim();

    localStorage.setItem("jarvis_key", API_KEY);

  }

}


// ==========================================
// 2. MODELS
// ==========================================

const MODELS = [
  "gemini-3.6-flash",
  "gemini-flash-latest"
];


// ==========================================
// 3. HTML ELEMENTS
// ==========================================

const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const send = document.getElementById("send");
const micBtn = document.getElementById("mic-btn");


// ==========================================
// 4. GEMINI BRAIN
// ==========================================

async function callGemini(prompt) {

  if (!API_KEY) {

    throw new Error(
      "Gemini API Key not provided."
    );

  }

  let lastError;


  for (const model of MODELS) {

    try {

      const response = await fetch(

        "https://generativelanguage.googleapis.com/v1beta/models/" +
        model +
        ":generateContent?key=" +
        encodeURIComponent(API_KEY),

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            contents: [

              {
                parts: [

                  {
                    text:
                      "You are J.A.R.V.I.S, a helpful AI assistant. " +
                      "Give clear and simple answers.\n\n" +
                      "User: " +
                      prompt
                  }

                ]
              }

            ]

          })

        }

      );


      const data = await response.json();


      if (!response.ok || data.error) {

        lastError = new Error(
          data?.error?.message ||
          "Gemini API Error"
        );

        continue;

      }


      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;


      if (!reply) {

        throw new Error(
          "Gemini returned an empty response."
        );

      }


      return reply;


    } catch (error) {

      lastError = error;

    }

  }


  throw lastError ||
    new Error("Gemini connection failed.");

}


// ==========================================
// 5. ASK JARVIS
// ==========================================

async function askGemini(prompt) {

  const aiMessage =
    add(
      "J.A.R.V.I.S: Thinking...",
      "ai"
    );


  try {

    const reply =
      await callGemini(prompt);


    aiMessage.innerText =
      "J.A.R.V.I.S: " + reply;


    // JARVIS SPEAKS
    speak(reply);


  } catch (error) {

    aiMessage.innerText =
      "J.A.R.V.I.S: ERROR - " +
      error.message;

    console.error(error);

  }

}


// ==========================================
// 6. SPEECH RECOGNITION
// ==========================================

const SR =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;


let rec = null;


if (SR) {

  rec = new SR();

  // English
  rec.lang = "en-US";

  // Telugu కావాలంటే:
  // rec.lang = "te-IN";


  rec.continuous = false;

  rec.interimResults = false;


  rec.onstart = function () {

    micBtn.innerText = "🔴";

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
      "Microphone Error:",
      event.error
    );

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

} else {

  micBtn.onclick = function () {

    alert(
      "Speech Recognition is not supported in this browser."
    );

  };

}


// ==========================================
// 7. TEXT TO SPEECH
// ==========================================

let voices = [];


function loadVoices() {

  voices =
    speechSynthesis.getVoices();

}


loadVoices();


speechSynthesis.onvoiceschanged =
  loadVoices;


function speak(text) {

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

      return voice.lang.startsWith("en");

    });


  if (voice) {

    utterance.voice = voice;

  }


  speechSynthesis.speak(
    utterance
  );

}


// ==========================================
// 8. SEND BUTTON
// ==========================================

send.onclick = function () {

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


// ==========================================
// 9. ENTER KEY
// ==========================================

input.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Enter") {

      event.preventDefault();

      send.click();

    }

  }
);


// ==========================================
// 10. ADD MESSAGE
// ==========================================

function add(text, type) {

  const div =
    document.createElement("div");


  div.className =
    "msg " + type;


  div.innerText = text;


  chat.appendChild(div);


  chat.scrollTop =
    chat.scrollHeight;


  return div;

}


// ==========================================
// 11. START MESSAGE
// ==========================================

add(
  "J.A.R.V.I.S: System online. How can I help you?",
  "ai"
);ans-serif;
  text-align: center;
  padding: 20px;
}

/* HEADER */

header h1 {
  color: #00d9ff;
  letter-spacing: 5px;
  margin-bottom: 5px;
}

header p {
  color: #78909c;
  letter-spacing: 3px;
  font-size: 12px;
}

/* CORE */

.core {
  width: 220px;
  height: 220px;
  margin: 30px auto 10px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
}

.ring {
  position: absolute;
  border: 2px solid #00d9ff;
  border-radius: 50%;
}

.r1 {
  width: 210px;
  height: 210px;
  animation: rotate 8s linear infinite;
}

.r2 {
  width: 160px;
  height: 160px;
  border-style: dashed;
  animation: rotateReverse 5s linear infinite;
}

.center {
  width: 75px;
  height: 75px;
  background: #00d9ff;
  border-radius: 50%;

  box-shadow:
    0 0 20px #00d9ff,
    0 0 50px #00d9ff;
}

.core-text {
  color: #00d9ff;
  font-weight: bold;
  letter-spacing: 3px;
}

/* STATUS */

.status {
  max-width: 600px;
  margin: 25px auto;
  padding: 20px;

  background: #07111c;
  border: 1px solid #12354a;
  border-radius: 12px;
}

.status h2 {
  color: #00d9ff;
  font-size: 18px;
  margin-top: 0;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 12px 5px;
  border-bottom: 1px solid #12354a;
}

.row:last-child {
  border-bottom: none;
}

.on {
  color: #00e676;
}

.off {
  color: #ff5252;
}

/* CHAT */

.chat {
  max-width: 600px;
  height: 300px;

  margin: 20px auto;

  padding: 15px;

  background: #050d16;

  border: 1px solid #12354a;
  border-radius: 12px;

  text-align: left;

  overflow-y: auto;
}

.msg {
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  line-height: 1.5;
  white-space: pre-wrap;
}

.msg.ai {
  background: #0b2230;
  border-left: 3px solid #00d9ff;
}

.msg.user {
  background: #172018;
  border-left: 3px solid #00e676;
}

/* INPUT */

.input-area {
  max-width: 600px;
  margin: auto;

  display: flex;
  gap: 8px;
}

#msg {
  flex: 1;

  padding: 14px;

  background: #07111c;
  color: white;

  border: 1px solid #12354a;
  border-radius: 8px;

  outline: none;
}

#msg:focus {
  border-color: #00d9ff;
}

button {
  border: none;
  border-radius: 8px;

  background: #00d9ff;
  color: #001018;

  font-weight: bold;

  padding: 0 16px;

  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

#mic-btn {
  width: 55px;
}

/* ANIMATION */

@keyframes rotate {

  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }

}

@keyframes rotateReverse {

  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }

}

/* MOBILE */

@media (max-width: 600px) {

  body {
    padding: 12px;
  }

  .core {
    width: 190px;
    height: 190px;
  }

  .r1 {
    width: 180px;
    height: 180px;
  }

  .r2 {
    width: 140px;
    height: 140px;
  }

  .input-area {
    flex-wrap: wrap;
  }

  #msg {
    width: 100%;
    flex: none;
  }

  #send {
    height: 45px;
    flex: 1;
  }

  #mic-btn {
    height: 45px;
  }

}
