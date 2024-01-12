chrome.runtime.onInstalled.addListener(function () {
  // Add a listener for the browser action
  chrome.browserAction.onClicked.addListener(function (tab) {
    // Open a new window with the specified properties
    chrome.windows.create({
      type: 'popup', // Use 'popup' type for a small window
      width: 600,    // Set the width as needed
      height: 400,   // Set the height as needed
      url: 'index.html' // Load the HTML file
    });
  });
});

// Define the function to initialize the questionnaire
function initializeQuestionnaire() {
  var modal = document.getElementById("myModal");

  // Check if the modal element exists
  if (modal) {
    // Close modal event listener
    document.getElementById("closeButton").addEventListener("click", closeModal);

    // Calculate result event listener
    document.getElementById("calculateButton").addEventListener("click", calculateResult);

    // Retry questionnaire event listener
    document.getElementById("retryButton").addEventListener("click", retryQuestionnaire);
  } else {
    console.error("Modal element not found.");
  }

  function closeModal() {
    if (modal) {
      modal.style.display = "none";
      document.getElementById("error").innerText = "";
    }
  }

  function calculateResult() {
    var num1 = parseFloat(document.getElementById("number1").value);
    var transportMode = parseFloat(document.getElementById("transportMode").value);
    var meatFrequency = parseFloat(document.getElementById("meatFrequency").value);

    if (isNaN(num1) || isNaN(transportMode) || isNaN(meatFrequency) || num1 < 0 || transportMode < 0 || meatFrequency < 0) {
      document.getElementById("error").innerText = "Veuillez entrer des nombres supérieurs ou égaux à 0.";
      return;
    }

    var result = num1 + transportMode + meatFrequency;

    document.getElementById("result").innerText = result;
    document.getElementById("error").innerText = "";
  }

  function retryQuestionnaire() {
    document.getElementById("number1").value = "";
    document.getElementById("transportMode").value = "3"; // Set the default value for transport mode
    document.getElementById("meatFrequency").value = "";
    document.getElementById("result").innerText = "";
    document.getElementById("error").innerText = "";
  }
  
}

// Add an event listener to run the questionnaire initialization when the content is loaded
document.addEventListener('DOMContentLoaded', initializeQuestionnaire);
