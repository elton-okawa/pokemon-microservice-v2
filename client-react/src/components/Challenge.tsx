import React, { useState, useEffect } from "react";
import { Container } from 'typedi';

import { ChallengeDatasource } from 'src/datasource/challenge.datasource';

const Challenge: React.FC = () => {
  const [challenges, setChallenges] = useState({});
  const challengeDatasource = Container.get(ChallengeDatasource);

  useEffect(() => {
    challengeDatasource.getChallenges(setChallenges);
  }, [challengeDatasource]);

  return <div>${JSON.stringify(challenges)}</div>;
}

export default Challenge;