import ollama from "ollama";

const response = await ollama.chat({
  model: "qwen:0.5b",
  messages: [{ role: "user", content: "Why is the sky blue?" }],
});

console.log(response.message.content);
