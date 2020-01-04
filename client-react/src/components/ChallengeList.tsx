import React, { useState, useEffect, ReactNode } from "react";
import { Container } from 'typedi';

import { ChallengeDatasource } from 'src/datasource/challenge.datasource';
import { AllChallengesModel } from "src/model";
import Challenge from "./Challenge";

const ChallengeList = () => {
  const [challenges, setChallenges] = useState({} as AllChallengesModel);
  const challengeDatasource = Container.get(ChallengeDatasource);

  useEffect(() => {
    challengeDatasource.getChallenges(setChallenges);
  }, [challengeDatasource]);

  return (
    <div>
      <h3>Your challenges:</h3>
        {challenges.userChallenges?.map(challenge => {
          return <Challenge challenge={challenge} />
        })}
      <h3>Opponent challenges:</h3>
        {challenges.opponentChallenges?.map(challenge => {
          return <Challenge challenge={challenge} />
        })}
      <h3>Finished challenges:</h3>
        {challenges.finishedChallenges?.map(challenge => {
          return <Challenge challenge={challenge} />
        })}
    </div>
  );
}

export default ChallengeList;