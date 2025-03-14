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


