import { Container } from 'typedi';

import { Command } from './command';
import { Constants } from './contants';

const LOGOUT_COMMAND = 'logout';

export class LogoutCommand extends Command {

  constructor() {
    super(LOGOUT_COMMAND);
  }

  do(args: any[]) {
    if (!Container.get(Constants[Constants.CURRENT_USER_ID])) {
      return 'Not logged in'
    }

    Container.set(Constants[Constants.CURRENT_USER_ID], 0);
    return 'Successful logged out';
  }  
  
  getUsage(): string {
    return `${LOGOUT_COMMAND}`;
  }
}