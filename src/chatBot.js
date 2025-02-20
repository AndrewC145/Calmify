import ollama from 'ollama';

const chatIntro = document.querySelector('.chat-intro');
const chatInput = document.querySelector('.chat-input');
const chatOutput = document.querySelector('.messages-container');
const sendBtn = document.querySelector('.send-msg');

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const userMessage = chatInput.value;
  if (userMessage === '') return;

  try {
    getBotResponse(userMessage);
    chatInput.value = '';
  } catch {
    console.error('Error: Unable to get response from the bot');
  }
}

async function getBotResponse(userMessage) {
  const response = await ollama.chat({
    model: 'qwen',
    messages: [{ role: 'user', content: userMessage }],
  });

  if (!response.ok) {
    throw new Error('Error: Unable to get response from the bot');
  }

  return console.log(response.message.content);
}
