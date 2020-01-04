import React, { useState, useEffect, ReactNode } from "react";
import { Container } from 'typedi';

import { TrainerDatasource } from 'src/datasource/trainer.datasource';
import { TrainerModel } from "src/model";

const TrainerList = () => {
  const [trainers, setTrainers] = useState([] as TrainerModel[]);
  const trainerDatasource = Container.get(TrainerDatasource);

  useEffect(() => {
    trainerDatasource.getTrainers().then(res => {
      setTrainers(res);
    });
  }, [TrainerDatasource]);

  return (
    <div>
      {trainers.map(trainer => {
        return (
          <div>
            <p>{trainer.name}</p>
            <ul>
              {trainer.pokemons.map(pokemon => {
                return (
                  <p>{pokemon.name}</p>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default TrainerList;