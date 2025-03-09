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
  const question = document.querySelector(".message-area").value;

  getResponse(question, console.log);
}

document.querySelector(".send-msg").addEventListener("click", sendMessage);
