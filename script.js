let btn = document.querySelector("#btn");
let content = document.querySelector("#content"); 
let greeted = false; 
let voice = document.querySelector("#voice"); 

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN"; // Hindi language
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning, Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon, Sir");
    } else {
        speak("Good Evening, Sir");
    }
}

// Combine the click event for both speaking the greeting and starting recognition
btn.addEventListener('click', () => {
    // Check if the greeting has been spoken
    if (!greeted) {
        wishMe(); // Trigger the greeting first only if it hasn't been spoken yet
        greeted = true; // Set the flag to true so the greeting is not repeated
    }
    btn.style.display = "none";   // Hide the button
    voice.style.display = "block"; // Show the voice GIF when recognition starts
    recognition.start(); // Start speech recognition after greeting or immediately if greeted
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

// Display the recognition result
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript; // Display the transcript in the content box
    takeCommand(transcript.toLowerCase()); // Process the spoken command
};

// Hide the voice GIF when recognition ends
recognition.onend = () => {
    voice.style.display = "none";  // Hide the voice GIF when recognition ends
    btn.style.display = "block";   // Show the button again for a new command
};

// Handle the spoken commands
function takeCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am a Virtual Assistant created by Deepak Sir.");
    } else if (message.includes("thank you") || message.includes("thanks")) { // Handle variations of "thank you"
        speak("You're very welcome. Let me know if you need further assistance.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/accounts/login", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/login.php", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening Calculator...");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"});
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, {day: "numeric", month: "short", year: "numeric"});
        speak(date);
    } else {
        let finalText = "This is what I found on internet regarding" + message.replace("shifra", "") || message.replace("shipra", "")
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("shifra", "")}`, "_blank");
    }
}
