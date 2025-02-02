import { Service } from "typedi";

import { TrainerBusDatasource } from "src/datasource";
import { Command } from "./command";

const TRAINER_COMMAND = 'trainer';

@Service()
export class TrainerCommand extends Command {
  
  constructor(
    private readonly trainerBusDatasource: TrainerBusDatasource,
  ) {
    super(TRAINER_COMMAND, 1);
  }

  async do(args: any[]) {
    try {
      const trainer = await this.trainerBusDatasource.getTrainer(args[0]);
      console.info(trainer);
      return trainer;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  getUsage(): string {
    return `${TRAINER_COMMAND} <id>`;
  }
}