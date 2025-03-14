import ollama from 'ollama/browser';

const sendBtn = document.querySelector(".send-msg");
const question = document.querySelector(".chat-input");

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
    stream: true,
  })

  let fullMessage = '';

  for await (const part of response) {
    fullMessage += part.message.content;
    console.log(fullMessage);
  }
}

function sendMessage() {
  const questionInput = question.value;

  getResponse(questionInput);
}

sendBtn.addEventListener("click", sendMessage);
question.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
    question.value = "";
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
