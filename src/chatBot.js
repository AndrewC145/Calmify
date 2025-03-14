import ollama from 'ollama/browser';


const sendBtn = document.querySelector(".send-msg");
const question = document.querySelector(".chat-input");
const chatIntro = document.querySelector(".chat-intro");
const messageContainer = document.querySelector(".messages-container");

async function getResponse(question) {
  const response = await ollama.chat({
    model: "qwen:0.5b",
    messages: [
      {
        role: "system",
        content: "You are a therapy chatbot. Answer anything related to mental health, but otherwise, say it is out of your scope."
      },
      {
        role: "user",
        content: question,
      },
    ],
  })

  let fullMessage = response.message.content;
  console.log(fullMessage);
  displayBotMessage(fullMessage)
}

function sendMessage() {
  chatIntro.remove();
  messageContainer.classList.replace("items-center", "justify-between");
  const questionInput = question.value;
  getResponse(questionInput);
  displayUserMessage();
  question.value = "";
}

function displayUserMessage() {
  const userMessage = document.createElement("div");
  const userText = document.createElement("p");
  userText.textContent = question.value;
  userText.classList.add("user-text");
  userMessage.classList.add("user-message");
  userMessage.appendChild(userText);
  messageContainer.appendChild(userMessage);
}

function displayBotMessage(message) {
  const botMessage = document.createElement("div");
  const botText = document.createElement("p");
  botText.textContent = message;
  botText.classList.add("bot-text");
  botMessage.classList.add("bot-message");

  botMessage.appendChild(botText);
  messageContainer.appendChild(botMessage);
}

sendBtn.addEventListener("click", sendMessage);
question.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
})

export function initialize() {
}


/*
const chatUrl = "http://127.0.0.1:11434/api/chat";

async function getResponse(question, callback) {
  const body = {
    model: "qwen:0.5b",
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
    stream: true,
  };

  const response = await fetch(chatUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  async function readStream(data) {
    const decode = new TextDecoder("utf-8");
    const reader = data.body.getReader();
    let result = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const text = decode.decode(value);
      const parts = text.split("\n");
      for (let i = 0; i < parts.length; i++) {
        if (parts[i] === "") {
          continue;
        }

        try {
          const json = JSON.parse(parts[i]);
          result += json["message"]["content"];
          callback(result);
        } catch {
          console.log("Error: " + parts[i]);
        }
      }
    }
  }

  await readStream(response);
}

function sendMessage() {
  const question = document.querySelector(".chat-input").value;

  getResponse(question, console.log);
}

document.querySelector(".send-msg").addEventListener("click", sendMessage);


export function initialize() {
  sendMessage();
}

*/
