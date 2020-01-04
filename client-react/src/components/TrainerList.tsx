import React, { useState, useEffect, ReactNode } from "react";
import { Container } from 'typedi';
import { Container as ReactContainer, Row, Col } from 'react-bootstrap';

import { TrainerDatasource } from 'src/datasource/trainer.datasource';
import { TrainerModel } from "src/model";
import Trainer from "./Trainer";
import HorizontalDivisor from "./HorizontalDivisor";

const TrainerList = () => {
  const [trainers, setTrainers] = useState([] as TrainerModel[]);
  const trainerDatasource = Container.get(TrainerDatasource);

  useEffect(() => {
    trainerDatasource.getTrainers().then(res => {
      setTrainers(res);
    });
  }, [trainerDatasource]);

  return (
    <div>
      {trainers.map(trainer => {
        return (
          <div>
            <Trainer key={trainer.id} trainer={trainer} />
            <HorizontalDivisor />
          </div>
        );
      })}
    </div>
  );
}

export default TrainerList;