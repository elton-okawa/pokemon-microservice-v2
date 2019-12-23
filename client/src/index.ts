import 'reflect-metadata';
import readline from 'readline';
import Container from 'typedi';

import { Command, ExitCommand, LogoutCommand, TrainerCommand, Constants, ChallengeCommand, PokemonCommand, LoginCommand, ChallengeListCommand } from './command';
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

const commands: Command[] = [
  Container.get(LoginCommand),
  Container.get(LogoutCommand),
  Container.get(PokemonCommand),
  Container.get(TrainerCommand),
  Container.get(ChallengeCommand),
  Container.get(ChallengeListCommand),
  Container.get(ChallengeResolveCommand),
  new ExitCommand(),
];

printDivisor();
commands.forEach(command => console.info(command.getUsage()));
printDivisor();

async function main() {
  while(1) {
    const answer = await ask('\nDigite um comando: ');
    const results = await Promise.all(commands.map(command => command.exec(answer.split(' '))));
    console.info(results.reduce((prev, curr) => prev || curr) || 'Invalid command');
  }
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();