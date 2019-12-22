import Container, { Service } from "typedi";

import { TrainerBusDatasource } from "src/datasource";
import { PubSubService } from "src/pubsub";
import { Command } from "./command";
import { Constants } from "./contants";

const CHALLENGE_COMMAND = 'challenge';

@Service()
export class ChallengeCommand extends Command {

  constructor(
    private readonly trainerBusDatasource: TrainerBusDatasource,
    private readonly pubsubService: PubSubService,
  ) {
    super(CHALLENGE_COMMAND);
  }

  async do(args: any[]) {
    
    try {
      const topicName = 'challenge';
      const userId = Container.get<number>(Constants[Constants.CURRENT_USER_ID]);
      const [userData, opponentData] = await Promise.all([
        this.trainerBusDatasource.getTrainer(userId),
        this.trainerBusDatasource.getTrainer(+args[1]),
      ]);
  
      const data = JSON.stringify({ user: userData, opponent: opponentData });
  
      const messageId = await this.pubsubService.publish(topicName, Buffer.from(data));
      console.log(`Message ${messageId} published.`);
    } catch (err) {
      console.error(err);
    }

    return true;
  }

  getUsage(): string {
    return `${CHALLENGE_COMMAND} <opponentId>`;
  }
}