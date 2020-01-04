import Container, { Service } from "typedi";

import { POKEMON_ICON_BASE_URL } from "src/env.constants";

@Service()
export class PokemonDatasource {

  pokemonIconBaseUrl: string;

  constructor() {
    this.pokemonIconBaseUrl = Container.get(POKEMON_ICON_BASE_URL);
  }

  getPokemonIconUrl(pokemonId: number, imageType: string = 'png') {
    return `${this.pokemonIconBaseUrl}/${pokemonId}.${imageType}`;
  }
}