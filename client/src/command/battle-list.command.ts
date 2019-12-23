import Container, { Service } from "typedi";

import { BattleBusDatasource } from "src/datasource";
import { Command } from "./command";
import { Constants } from "./contants";

const BATTLE_LIST_COMMAND = 'battle-list';

@Service()
export class BattleListCommand extends Command {

  constructor(
    private readonly battleBusDatasource: BattleBusDatasource,
  ) {
    super(BATTLE_LIST_COMMAND);
  }

  async do(args: any[]) {

    try {
      const userId = Container.get<number>(Constants[Constants.CURRENT_USER_ID]);
      const userBattleList = await this.battleBusDatasource.getUserBattles(userId);

      this.printFormattedBattlesMessage(userBattleList);
    } catch (err) {
      console.error(err);
    }

    return true;
  }

  private printFormattedBattlesMessage(battleList) {
    battleList.forEach(battle => {
      const userPokemons = battle.user.pokemons.map(pokemon => pokemon.name).reduce((prev, curr) => `${prev} ${curr}`, '');
      const opponentPokemons = battle.opponent.pokemons.map(pokemon => pokemon.name).reduce((prev, curr) => `${prev} ${curr}`, '');
      console.info(`${battle.id}: ${battle.user.name} vs ${battle.opponent.name}`);
      console.info(`\t${battle.user.name} pokemons: ${userPokemons}`);
      console.info(`\t${battle.opponent.name} pokemons: ${opponentPokemons}`);
      console.info(`\tWinner: ${battle.winner}`);
    });
  }

  getUsage(): string {
    return `${BATTLE_LIST_COMMAND}`;
  }
}