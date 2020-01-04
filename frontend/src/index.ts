import 'reflect-metadata';
import readline from 'readline';
import Container from 'typedi';
import express from 'express';
import cors from 'cors';

import { 
  Command, 
  ExitCommand, 
  LogoutCommand, 
  TrainerCommand, 
  Constants, 
  ChallengeCommand, 
  ChallengeResolveCommand, 
  LoginCommand, 
  ChallengeListCommand, 
  BattleListCommand,
} from './command';

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const PORT = process.env.PORT || 80;


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

async function main() {

  app.get('/', (req, res) => {
    res.send('Request ok');
  });

  app.post('/', async (req, res) => {
    const command = commands[req.body.command];
    if (!command) {
      console.error('Invalid command');
      res.status(404).send('Invalid command');
    } else {
      const responseString = await command.exec(req.body.args);
      console.info(responseString);
      res.send(responseString);
    }
  });

  app.listen(PORT);
  console.info(`Frontend is listening to port ${PORT}`);
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();