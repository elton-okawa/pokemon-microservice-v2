import Container, { Service } from "typedi";

import { Command } from "./command";
import { Constants } from "./contants";

const POKEMON_COMMAND = 'pokemon';

@Service()
export class PokemonCommand extends Command {

  constructor(
  ) {
    super(POKEMON_COMMAND);
  }

  async do(args: any[]) {
    const id = args[1];
    if (!id) {
      return 'Type an id';
    }

    try {
      return;
    } catch (error) {
      if (error.response) {
        return `[Status: ${error.response.status}] ${error.response.data}`;
      } else {
        return error.message;
      }
    }
  }  
  
  getUsage(): string {
    return `${POKEMON_COMMAND} <id>`;
  }
}