import 'reflect-metadata';
import readline from 'readline';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:80';
const app = axios.create({ baseURL: FRONTEND_URL });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

function ask(message: string): Promise<string> {
  return new Promise(resolve => rl.question(message, answer => {
    resolve(answer);
  }))
}

async function main() {
  console.info(`Client requesting to ${FRONTEND_URL}`);
  while(1) {
    const answer = await ask('\nDigite um comando: ');
    const args = answer.split(' ');
    const data = {
      command: args[0],
      args: args.slice(1),
    }

    try {
      const response = await app.post('/', data);
      console.info(response.data);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error(error);
      }
    }
  }
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();