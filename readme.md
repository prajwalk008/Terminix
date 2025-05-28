# 🧠 Terminix – AI-Powered Terminal Assistant
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Gemini API](https://img.shields.io/badge/LLM-Gemini-blue)](https://aistudio.google.com/)
[![Last Commit](https://img.shields.io/github/last-commit/prajwalk008/terminix)](https://github.com/prajwalk008/terminix/commits/main)

Terminix is your intelligent terminal buddy built with Node.js and the Gemini API. It helps developers quickly generate and execute terminal commands using natural language – like magic, but in the shell.

---

## ✨ Features

- 🔍 Converts natural language to shell commands
- 🧠 Powered by Google's Gemini API (Free-tier supported)
- ⚙️ Detects your OS and tailors commands accordingly
- 🗣️ Interactive CLI – asks before executing commands
- 🔁 Keeps running until you decide to exit
- 💬 Minimal responses, just the command you need

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/prajwalk008/terminix.git
cd terminix
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set your API key
I have used Gemini API over here. You can go on to https://aistudio.google.com/app/apikey to get your API key.  

```bash
touch .env
```

Add you Gemini API key in .env
```js
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 4. Make It Global (Optional)

##### 1. Add this to your package.json

```json
"bin": {
  "tg": "./index.js"
}
```
##### 2. Link it globally

```bash
npm link
```

Now, you can simple run-

```bash
tg
```
---
## 🛠️Project Structure
```bash
terminix/
├── index.js           # Entry point
├── src/
│   └── copilot.js     # Gemini interaction and logic
├── .env               # API key stored here
├── package.json
```

---
## 📋 Example Usage
```bash
tg
> 💬 What do you want to do? install express in a project

✅ Suggested Command: npm install express
❓ Do you want to run this? [yes/no]
```
---
## 🧱 Built With
- Node.js

- inquirer

- @google/generative-ai

- dotenv
---
## 📄 License
- MIT License. Use freely and make it better! 

---
## 🙌 Contributing
Pull requests are welcome! Feel free to fork, improve, and share.

---
## 🧑‍💻 Author

Created By Prajwal K







