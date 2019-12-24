import Container, { Service } from "typedi";

import { TrainerBusDatasource, ChallengeBusDatasource } from "src/datasource";
import { PubSubService } from "src/pubsub";
import { Command } from "./command";
import { Constants } from "./contants";

const CHALLENGE_RESOLVE_COMMAND = 'challenge-resolve';

@Service()
export class ChallengeResolveCommand extends Command {

  constructor(
    private readonly pubsubService: PubSubService,
  ) {
    super(CHALLENGE_RESOLVE_COMMAND, 2);
  }

  async do(args: any[]) {

    try {
      const accepted = args[1] === 'yes' ? true : false;
      const challengeResolveTopic = 'challenge-resolve';

      const data = JSON.stringify({ id: args[0], accepted });
      await this.pubsubService.publish(challengeResolveTopic, Buffer.from(data));

    } catch (err) {
      console.error(err);
    }
  }

  getUsage(): string {
    return `${CHALLENGE_RESOLVE_COMMAND} <id> <yes || no>`;
  }
}