import inquirer from 'inquirer';
import os from 'os';
import { execSync } from 'child_process';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getCommandFromGemini(userPrompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const platform = os.platform(); 
  const cwd = process.cwd();
  const tools = execSync('npm list --depth=0', { encoding: 'utf-8' });

  const systemPrompt = `
You are a terminal assistant. The user is on ${platform}.
Current working directory: ${cwd}.
Installed tools (npm): ${tools}.

Your job is to return ONLY the terminal command(s) needed for the user request. No explanations.
Do not use markdown or formatting. Just write the raw shell command.
If multiple commands are required, combine them with '&&' where possible.
`;

  const result = await model.generateContent(systemPrompt + '\n\nUser: ' + userPrompt);
  const response = result.response.text();

  return extractShellCommand(response);
}

function extractShellCommand(text) {
  const codeBlockMatch = text.match(/```(?:bash|sh)?\n(.+?)```/s);
  if (codeBlockMatch) return codeBlockMatch[1].trim();

  const inlineMatch = text.match(/(?:\$ |^)([^\n]+)/);
  if (inlineMatch) return inlineMatch[1].trim();

  return null;
}

export async function handleCommand() {
  console.log("🚀 Welcome to Terminix Copilot (type 'exit' to quit)\n");
  while(true){
    const { task } = await inquirer.prompt([
      {
        type: 'input',
        name: 'task',
        message: '💬 What do you want to do?',
      },
    ]);
    if (task.toLowerCase() === 'exit' || task.toLowerCase() === 'quit') {
      console.log("👋 Exiting. See you!");
      break;
    }

    const command = await getCommandFromGemini(task);

    if (!command) {
      console.log('❌ Could not extract a command.');
      return;
    }

    console.log(`\n📦 Suggested command:\n> ${command}`);

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: '⚙️ Do you want to run this command?',
        default: false,
      },
    ]);

    if (confirm) {
      try {
        execSync(command, { stdio: 'inherit', shell: true });
      } catch (err) {
        console.error('❌ Error executing command:', err.message);
      }
    }
  }
  
}
