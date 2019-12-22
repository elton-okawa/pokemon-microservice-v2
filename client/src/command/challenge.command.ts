import { Service } from "typedi";

import { PubSubService } from "src/pubsub";
import { Command } from "./command";

const CHALLENGE_COMMAND = 'challenge';

@Service()
export class ChallengeCommand extends Command {

  constructor(
    private readonly pubsubService: PubSubService,
  ) {
    super(CHALLENGE_COMMAND);
  }

  async do(args: any[]) {
    
    const topicName = 'challenge';
    const data = JSON.stringify({ id: args[1] });

    const messageId = await this.pubsubService.publish(topicName, Buffer.from(data));
    console.log(`Message ${messageId} published.`);

    return true;
  }

  getUsage(): string {
    return `${CHALLENGE_COMMAND} <opponentId>`;
  }
}