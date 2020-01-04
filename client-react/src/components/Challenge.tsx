import React, { useState, useEffect, ReactNode } from "react";
import { Container } from 'typedi';

import { ChallengeDatasource } from 'src/datasource/challenge.datasource';
import { AllChallengesModel, ChallengeModel, TrainerModel } from "src/model";
import { userInfo } from "os";

interface ChallengeProps {
  challenge: ChallengeModel,
}

const Challenge = (props: ChallengeProps) => {
  const { user, opponent, status } = props.challenge;

  return (
    <div>
      {renderTrainer(user)}
      {renderTrainer(opponent)}
      <p>{status}</p>
    </div>
  );
}

function renderTrainer(trainer: TrainerModel) {
  return (
    <div>
      <p>{trainer.name}</p>
      <ul>
        {trainer.pokemons.map(pokemon => {
          return (
            <li>{pokemon.name}</li>
          );
        })}
      </ul>
    </div>
  );
}

export default Challenge;