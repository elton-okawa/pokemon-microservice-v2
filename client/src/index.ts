import 'reflect-metadata';
import readline from 'readline';
import axios from 'axios';

const INTERNAL_CLIENT_URL = process.env.INTERNAL_CLIENT_URL || 'localhost:3000';
const app = axios.create({ baseURL: INTERNAL_CLIENT_URL });

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
  while(1) {
    const answer = await ask('\nDigite um comando: ');
    const args = answer.split(' ');
    const data = {
      command: args[0],
      args: args.slice(1),
    }

    try {
      const response = await axios.post('/', data);
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