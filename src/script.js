// Function to add user and bot messages to the chatbox
function addMessage(message, isUser = false) {
    let chatBox = document.getElementById("chat-box");

    let messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", isUser ? "user-message" : "bot-message");
    messageDiv.innerHTML = message;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Function to handle the AI response and display it using a typewriter effect
function displayResponse(response) {
    addMessage(response.data.answer, false); // Add bot's response
}

// Function to make the API call and generate the AI response
function generateResponse(event) {
    event.preventDefault();

    let questionInput = document.querySelector("#user-question");
    let userQuestion = questionInput.value.trim(); // Get the user's question

    if (!userQuestion) return; // Don't process empty messages

    // Add the user's message to the chatbox
    addMessage(userQuestion, true);

    // API Key (from SheCodes)
    let apiKey = "9te2009b94ad39f916306f09bc5do169";

    // Context for the AI to follow (make sure it's related to the module guide chatbot)
    let context = 
        "You are a chatbot designed to assist with questions about any English word and translate it to Isizulu. Respond in isiZulu only. Your goal is to answer the user's question about any English word, based on their input, and explain clearly in isiZulu.";
    
    // Prompt structure
    let prompt = `Umbuzo womsebenzisi: ${userQuestion}`;

    // API URL
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    // Display a "typing" indicator while waiting for the AI to respond
    addMessage("⏳ Linda imizuzwana...", false);

    // Make the API call using Axios
    axios.get(apiUrl).then((response) => {
        // Remove the "typing" indicator
        const chatBox = document.getElementById("chat-box");
        chatBox.removeChild(chatBox.lastChild);
        displayResponse(response);
    });

    // Clear the input field
    questionInput.value = '';
}

// Event listener for the form submission
let chatbotForm = document.querySelector("#chatbot-form");
chatbotForm.addEventListener("submit", generateResponse);
