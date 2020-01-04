import { PokemonModel } from "./pokemon.model";

export interface TrainerModel {
  id: number;
  name: string;
  pokemons: PokemonModel[];
}