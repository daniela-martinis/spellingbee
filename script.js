// Array to hold the list of words
let words = [];

// Index to keep track of the current word being displayed
let currentIndex = 0;

// Function to fetch the list of words from the text file
function fetchWords() {
    fetch('spelling_bee_word_list.txt')
        .then(response => response.text())
        .then(data => {
            // Split the text data into an array of words
            words = data.trim().split('\n');
            // Start displaying the words
            displayWord();
        });
}

// Function to display the current word and speak it
function displayWord() {
    // If there are still words left
    if (currentIndex < words.length) {
        // Get the current word
        let currentWord = words[currentIndex];

        // Set word index on screen
        document.getElementById('wordIndex').innerHTML = "<h5>Word Index: " + currentIndex + "</h5>";
        
        // Create a SpeechSynthesisUtterance object
        let utterance = new SpeechSynthesisUtterance(currentWord);
        
        // Set the rate to slow down the speech
        utterance.rate = 0.6;

        document.getElementById('wordDisplay').innerText = "";
        // Speak the word
        window.speechSynthesis.speak(utterance);

        // Increment the index for the next word
        currentIndex++;
    } else {
        // If all words have been displayed, show a message
        document.getElementById('wordDisplay').innerText = "End of words";
    }
}

// Function to repeat word
function speakWord() {
    // If there are still words left
    if (currentIndex < words.length) {
        // Get the current word
        let currentWord = words[currentIndex - 1];
        
        // Create a SpeechSynthesisUtterance object
        let utterance = new SpeechSynthesisUtterance(currentWord);
        
        // Speak the word
        window.speechSynthesis.speak(utterance);
    }
}

// Function to check spelling
let correctCount = 0;
let count = 0;
let attempts = 0;
function checkSpelling() {
    let userInput = document.getElementById('userInput').value.trim().toLowerCase();
    let currentWord = words[currentIndex - 1].trim().toLowerCase();

    // Compare user input with the current word
    if (userInput === currentWord) {
        count++;
        document.getElementById('result').innerText = "Correct!";
        if (attempts == 0) {
           correctCount++; 
        }
        else {
            attempts = 0;
        }
        document.getElementById('wordCount').innerText = "Correct: " + correctCount + " / Total: " + count;
        // Display the next word
        displayWord();
    } else {
        attempts += 1;
        document.getElementById('result').innerText = "Incorrect. The correct spelling is: " + currentWord + ". Please type it correctly in the textbox to move on.";
    }

    // Clear the input field
    document.getElementById('userInput').value = '';
}

function handleKeyPress(event) {
    // Check if the pressed key is "Enter" (key code 13)
    if (event.keyCode === 13) {
        checkSpelling();
    }
}

// Function to show the modal for inputting the last index
function showIndexModal() {
    let indexModal = new bootstrap.Modal(document.getElementById('indexModal'));
    indexModal.show();
}

// Function to save the last index from user input
function saveLastIndex() {
    fetchWords();
    let lastIndex = parseInt(document.getElementById('lastIndexInput').value.trim());
    if (!isNaN(lastIndex)) {
        currentIndex = lastIndex;
        // Close the modal
        let indexModal = bootstrap.Modal.getInstance(document.getElementById('indexModal'));
        indexModal.hide();
        displayWord();
    }
}

// Call the function to show the modal when the page is loaded
window.onload = showIndexModal;
