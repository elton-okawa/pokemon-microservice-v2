import React from "react";
import { Container } from 'typedi';
import { useAlert } from 'react-alert'

import { TrainerModel } from "src/model";
import { PokemonDatasource } from "src/datasource/pokemon.datasource";
import { ChallengeDatasource } from "src/datasource/challenge.datasource";
import './common.css';
import './Trainer.css';

interface TrainerProps {
  trainer: TrainerModel;
}

const Trainer = (props: TrainerProps) => {
  const { trainer } = props;
  const pokemonDatasource = Container.get(PokemonDatasource);

  return (
    <div id="trainer">
      <p>Name: <strong>{trainer.name}</strong></p>
      <ul className="inline-list-items">
        {trainer.pokemons.map(pokemon => {
          return (
            <li key={pokemon.id} className="pokemon-square">
              <img className="small-image" src={pokemonDatasource.getPokemonIconUrl(pokemon.id)}/>
              <p>{pokemon.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Trainer;