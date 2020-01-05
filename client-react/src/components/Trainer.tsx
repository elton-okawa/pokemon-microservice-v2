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
  const alert = useAlert();

  const handleClick = (event) => {
    const challengeDatasource = Container.get(ChallengeDatasource);
    challengeDatasource.createChallenge(trainer.id).then(res => {
      alert.show(`Challenge created successfully`);
    }).catch(err => {
      alert.show(err.message);
    });
  }

  return (
    <div id="trainer">
      <p>Name: <strong>{trainer.name}</strong></p>
      <ul className="flex-list inline-list-items">
        {trainer.pokemons.map(pokemon => {
          return (
            <li key={pokemon.id} className="pokemon-square">
              <img className="small-image" src={pokemonDatasource.getPokemonIconUrl(pokemon.id)}/>
              <p>{pokemon.name}</p>
            </li>
          );
        })}
        <div className="empty-horizontal-space"/>
        <button id="challenge-button" onClick={handleClick}>Challenge!</button>
      </ul>
    </div>
  );
}

export default Trainer;