import Container, { Service } from "typedi";

import { Command } from "./command";
import { Constants } from "./contants";

const LOGIN_COMMAND = 'login';

@Service()
export class LoginCommand extends Command {

  constructor() {
    super(LOGIN_COMMAND, 1);
  }

  async do(args: any[]) {

    Container.set(Constants[Constants.CURRENT_USER_ID], +args[1]);

    return true;
  }

  getUsage(): string {
    return `${LOGIN_COMMAND} <id>`;
  }
}