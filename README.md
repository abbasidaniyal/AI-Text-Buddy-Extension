# 🧩 AI Text Buddy - Chrome Extension

Fix and rewrite text anywhere on the web with the power of AI.

---

## ✨ Features

* **Fix Text:** Automatically correct grammar, spelling, and punctuation.
* **Rewrite Text:** Make your writing clearer and more engaging.
* **FastAPI Lambda Backend:** Runs serverless with OpenAI.
* **Context Menu Integration:** Right-click to process text instantly.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/abbasidaniyal/AI-Text-Buddy-Extension.git
cd AI-Text-Buddy-Extension
```

---

### 2️⃣ Configure the backend URL

Create `config.js` in the root of your extension:

```javascript
window.BASE_BACKEND = "https://your-lambda-url.us-east-1.on.aws";
```

**Tip:**
Use your deployed Lambda URL or local server URL (e.g., `http://localhost:8000`).

---

### 3️⃣ Build or prepare files

Make sure you have these files:

* `manifest.json`
* `config.js`
* `src/popup.html`
* `src/popup.js`
* `src/content.js`
* `src/background.js`

---

### 4️⃣ Install in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the folder containing `manifest.json`

✅ The extension will appear in your toolbar.

---

## 🛠️ Usage

Once installed:

### 🖱️ Using the Context Menu

1. Highlight any text in an input, textarea, or contenteditable field
2. Right-click
3. Choose:

   * **Fix with AI**
   * **Rewrite with AI**

✅ The text will be replaced with the processed version.

---

### 🪟 Using the Popup

1. Click the extension icon in your Chrome toolbar
2. The popup will display the configured backend URL
3. (Optional) Add additional actions in the popup if desired

---

## 🧑‍💻 Developer Notes

### Backend Setup

Your Lambda FastAPI backend must have the following endpoints:

* `POST /fix-text`
  Request body:

  ```json
  { "text": "your text" }
  ```

* `POST /rewrite-text`
  Request body:

  ```json
  { "text": "your text" }
  ```

* `GET /health`
  Returns health status.

See the backend repository here:
👉 [Backend GitHub Repo](https://github.com/abbasidaniyal/AI-Text-Buddy-Backend)
