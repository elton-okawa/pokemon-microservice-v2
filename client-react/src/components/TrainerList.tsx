import React, { useState, useEffect } from "react";
import { Container } from 'typedi';
import { useAlert } from "react-alert";

import { TrainerDatasource } from 'src/datasource/trainer.datasource';
import { ChallengeDatasource } from "src/datasource/challenge.datasource";
import { TrainerModel } from "src/model";
import Trainer from "./Trainer";
import HorizontalDivisor from "./HorizontalDivisor";

const TrainerList = () => {
  const [trainers, setTrainers] = useState([] as TrainerModel[]);
  const trainerDatasource = Container.get(TrainerDatasource);
  const alert = useAlert();

  const handleClick = (event, trainerId) => {
    const challengeDatasource = Container.get(ChallengeDatasource);
    challengeDatasource.createChallenge(trainerId).then(res => {
      alert.show(`Challenge created successfully`);
    }).catch(err => {
      alert.show(err.message);
    });
  }

  useEffect(() => {
    trainerDatasource.getTrainers().then(res => {
      setTrainers(res);
    });
  }, [trainerDatasource]);

  return (
    <div>
      {trainers.map(trainer => {
        return (
          <div className="container">
            <div className="flex-list">
              <Trainer key={trainer.id} trainer={trainer} />
              <div className="empty-horizontal-space" />
              <button id="challenge-button" onClick={(event) => handleClick(event, trainer.id)}>Challenge!</button>
            </div>
            <HorizontalDivisor />
          </div>
        );
      })}
    </div>
  );
}

export default TrainerList;