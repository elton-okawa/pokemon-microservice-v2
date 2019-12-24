import Container, { Service } from "typedi";

import { ChallengeBusDatasource } from "src/datasource";
import { ChallengeStatus } from "src/challenge-status";
import { Command } from "./command";
import { Constants } from "./contants";

const CHALLENGE_LIST_COMMAND = 'challenge-list';

@Service()
export class ChallengeListCommand extends Command {

  constructor(
    private readonly challengeBusDatasource: ChallengeBusDatasource,
  ) {
    super(CHALLENGE_LIST_COMMAND);
  }

  async do(args: any[]) {

    try {
      const userId = Container.get<number>(Constants[Constants.CURRENT_USER_ID]);
      if (!userId) {
        console.info('Login first');
        return;
      }
      const [userChallenges, opponentChallenges] = await Promise.all([
        this.challengeBusDatasource.getUserChallenges(userId, [ChallengeStatus.Pending]),
        this.challengeBusDatasource.getOpponentChallenges(userId, [ChallengeStatus.Pending]),
      ]);

      const [finishedChallenges] = await Promise.all([
        this.challengeBusDatasource.getChallenges(userId, [ChallengeStatus.Accepted, ChallengeStatus.Refused]),
      ]);

      console.info('Your pending challenges:');
      this.printFormattedChallengeMessage(userChallenges.challenges);
      console.info('\nOpponent pending challenges:');
      this.printFormattedChallengeMessage(opponentChallenges.challenges);
      console.info('\nFinished challenges:');
      this.printFormattedChallengeMessage(finishedChallenges.challenges);
    } catch (err) {
      console.error(err);
    }

    return true;
  }

  getUsage(): string {
    return `${CHALLENGE_LIST_COMMAND}`;
  }

  private printFormattedChallengeMessage(challengeList) {
    challengeList.forEach(challenge => {
      const userPokemons = challenge.user.pokemons.map(pokemon => pokemon.name).reduce((prev, curr) => `${prev} ${curr}`, '');
      const opponentPokemons = challenge.opponent.pokemons.map(pokemon => pokemon.name).reduce((prev, curr) => `${prev} ${curr}`, '');
      console.info(`${challenge.status.toUpperCase()} ${challenge.id}: ${challenge.user.name} vs ${challenge.opponent.name}`);
      console.info(`\tYour pokemons: ${userPokemons}`);
      console.info(`\tOpponent pokemons: ${opponentPokemons}`);
    });
  }
}