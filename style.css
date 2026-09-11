* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background: #02060d;
  color: white;
  font-family: Arial, sans-serif;
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
