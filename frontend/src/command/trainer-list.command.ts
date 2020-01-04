import { Service } from "typedi";

import { TrainerBusDatasource } from "src/datasource";
import { Command } from "./command";

const TRAINER_LIST_COMMAND = 'trainer-list';

@Service()
export class TrainerListCommand extends Command {

  constructor(
    private readonly trainerBusDatasource: TrainerBusDatasource,
  ) {
    super(TRAINER_LIST_COMMAND);
  }

  async do(args: any[]) {
    try {
      const trainerList = await this.trainerBusDatasource.getTrainerList();
      console.info(trainerList);
      return trainerList;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  getUsage(): string {
    return `${TRAINER_LIST_COMMAND} <id>`;
  }
}