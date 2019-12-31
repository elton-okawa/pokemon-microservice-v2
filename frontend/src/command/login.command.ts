import Container, { Service } from "typedi";

import { Command } from "./command";
import { Constants } from "./contants";

const LOGIN_COMMAND = 'login';

@Service()
export class LoginCommand extends Command {

  constructor() {
    super(LOGIN_COMMAND, 1);
  }

  do(args: any[]) {
    Container.set(Constants[Constants.CURRENT_USER_ID], +args[0]);
    return `Successfully logged in as ${args[0]}`;
  }

  getUsage(): string {
    return `${LOGIN_COMMAND} <id>`;
  }
}