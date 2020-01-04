import React, { useState, useEffect, ReactNode } from "react";
import { Container } from 'typedi';

import { TrainerModel } from "src/model";
import { PokemonDatasource } from "src/datasource/pokemon.datasource";
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
        <button id="challenge-button">Challenge!</button>
      </ul>
    </div>
  );
}

export default Trainer;