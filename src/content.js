// Content script to handle text processing
let lastFocusedElement = null;

import { BASE_BACKEND } from "./config.js";

// Track focused editable elements
document.addEventListener('focusin', (event) => {
  const element = event.target;
  if (element.tagName.match(/INPUT|TEXTAREA/) || element.isContentEditable) {
    lastFocusedElement = element;
  }
});

// Handle right-click context to ensure proper element selection
document.addEventListener('contextmenu', (event) => {
  const element = event.target;
  if (element.tagName.match(/INPUT|TEXTAREA/) || element.isContentEditable) {
    lastFocusedElement = element;
  }
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "processText") {
    handleAIRequest(request.type);
  }
});

function handleAIRequest(action) {
  const activeElement = document.activeElement || lastFocusedElement;
  
  if (!activeElement || (!activeElement.tagName.match(/INPUT|TEXTAREA/) && !activeElement.isContentEditable)) {
    showNotification("Please select a text input field", "error");
    return;
  }

  const originalText = activeElement.value || activeElement.textContent || activeElement.innerText;
  
  if (!originalText.trim()) {
    showNotification("No text to process", "error");
    return;
  }

  // Show loading indicator
  const originalValue = activeElement.value || activeElement.textContent;
  const isInputField = activeElement.tagName.match(/INPUT|TEXTAREA/);
  
  if (isInputField) {
    activeElement.value = "Processing...";
  } else {
    activeElement.textContent = "Processing...";
  }
  
  // Disable the element
  activeElement.disabled = true;
  activeElement.style.opacity = '0.6';

  // Make API call
  const endpoint = action === "fix-with-ai" ? "/fix-text" : "/rewrite-text";
  
  fetch(`${BASE_BACKEND}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: originalText
    })
  })
  .then(response => response.json())
  .then(data => {
    // Restore the element
    activeElement.disabled = false;
    activeElement.style.opacity = '1';
    
    if (data.success) {
      if (isInputField) {
        activeElement.value = data.processed_text;
      } else {
        activeElement.textContent = data.processed_text;
      }
      
      // Trigger input event to notify any listeners
      activeElement.dispatchEvent(new Event('input', { bubbles: true }));
      activeElement.dispatchEvent(new Event('change', { bubbles: true }));
      
      showNotification("Text processed successfully!", "success");
    } else {
      showNotification(`Error: ${data.error}`, "error");
      // Restore original text on error
      if (isInputField) {
        activeElement.value = originalValue;
      } else {
        activeElement.textContent = originalValue;
      }
    }
  })
  .catch(error => {
    console.error("Error:", error);
    activeElement.disabled = false;
    activeElement.style.opacity = '1';
    showNotification("Failed to process text. Please check if the backend server is running.", "error");
    
    // Restore original text on error
    if (isInputField) {
      activeElement.value = originalValue;
    } else {
      activeElement.textContent = originalValue;
    }
  });
}

// Show notification function
function showNotification(message, type = "info") {
  // Remove existing notification
  const existingNotification = document.getElementById('ai-text-assistant-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'ai-text-assistant-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#44ff44' : '#4444ff'};
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    max-width: 300px;
    word-wrap: break-word;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}