import React, { useState, useEffect } from "react";
import { Container } from 'typedi';
import { useAlert } from "react-alert";

import { ChallengeDatasource } from 'src/datasource/challenge.datasource';
import { AllChallengesModel, ChallengeModel } from "src/model";
import Challenge from "./Challenge";
import './ChallengeList.css';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState({} as AllChallengesModel);
  const challengeDatasource = Container.get(ChallengeDatasource);
  const alert = useAlert();

  useEffect(() => {
    challengeDatasource.getChallenges(setChallenges);
  }, [challengeDatasource]);

  const handleClick = (event, challengeId: string, answer: string) => {
    const challengeDatasource = Container.get(ChallengeDatasource);
    challengeDatasource.resolveChallenge(challengeId, answer).then(res => {
      alert.show(`Challenge resolved successfully`);

      const resolvedChallenge = challenges.opponentChallenges.find(challenge => challenge.id === challengeId) as ChallengeModel;
      resolvedChallenge.status = answer === 'yes' ? 'accepted' : 'refused'; 
      const newOpponentChallenges = challenges.opponentChallenges.filter(challenge => challenge.id !== challengeId);
      const newFinishedChallenges = [ ...challenges.finishedChallenges, resolvedChallenge];

      setChallenges({ ...challenges, opponentChallenges: newOpponentChallenges, finishedChallenges: newFinishedChallenges });
    }).catch(err => {
      alert.show(err.message);
    });
  }

  return (
    <div className="container">
      <h3>Your challenges:</h3>
        {challenges.userChallenges?.map(challenge => {
          return <Challenge key={challenge.id} challenge={challenge} />
        })}
      <h3>Opponent challenges:</h3>
        {challenges.opponentChallenges?.map(challenge => {
          return (
            <div>
              <Challenge key={challenge.id} challenge={challenge} />
              <div id="challenge-buttons-container">
                <button id="challenge-accept" onClick={event => handleClick(event, challenge.id, 'yes')}>Accept</button>
                <button id="challenge-refuse" onClick={event => handleClick(event, challenge.id, 'no')}>Refuse</button>
              </div>
            </div>
          );
        })}
      <h3>Finished challenges:</h3>
        {challenges.finishedChallenges?.map(challenge => {
          return <Challenge key={challenge.id} challenge={challenge} />
        })}
    </div>
  );
}

export default ChallengeList;