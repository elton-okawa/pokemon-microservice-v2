export abstract class Command {
  private command: string;
  private lengthOfArguments: number;

  constructor(command: string, lengthOfArguments = 0) {
    this.command = command;
    this.lengthOfArguments = lengthOfArguments;
  }

  exec(args: any[]): void {
    return this.do(args);
  }

  getCommand() {
    return this.command;
  }

  abstract do(args: any[]): void;
  abstract getUsage(): string;
}