import 'reflect-metadata';
import readline from 'readline';
import Container from 'typedi';

import { Command, ExitCommand, LogoutCommand, TrainerCommand, Constants, ChallengeCommand, LoginCommand, ChallengeListCommand, BattleListCommand } from './command';
import { ChallengeResolveCommand } from './command/challenge-resolver.command';

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

function printDivisor() {
  console.info('\n################################\n');
}

Container.set(Constants[Constants.CURRENT_USER_ID], 0);

const commands: { [x: string]: Command } = [
  Container.get(LoginCommand),
  Container.get(LogoutCommand),
  Container.get(TrainerCommand),
  Container.get(ChallengeCommand),
  Container.get(ChallengeListCommand),
  Container.get(ChallengeResolveCommand),
  Container.get(BattleListCommand),
  new ExitCommand(),
].reduce((prev, curr) => {
  prev[curr.getCommand()] = curr;

  return prev;
}, {});

printDivisor();
Object.values(commands).forEach(command => console.info(command.getUsage()));
printDivisor();

async function main() {
  while(1) {
    const answer = await ask('\nDigite um comando: ');
    const args = answer.split(' ');
    const command = commands[args[0]];
    if (!command) {
      console.error('Invalid command');
    } else {
      await command.exec(args.slice(1));
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