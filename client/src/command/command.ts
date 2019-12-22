export abstract class Command {
  command: string;
  lengthOfArguments: number;

  constructor(command: string, lengthOfArguments = 0) {
    this.command = command;
    this.lengthOfArguments = lengthOfArguments + 1;
  }

  exec(args: any[]): any {
    if (args[0] !== this.command || args.length !== this.lengthOfArguments) {
      return;
    }

    return this.do(args);
  }

  abstract do(args: any[]): any;
  abstract getUsage(): string;
}