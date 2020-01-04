import React, { useState, useEffect, ReactNode } from "react";
import { Container } from 'typedi';

import { ChallengeDatasource } from 'src/datasource/challenge.datasource';

const Challenge = () => {
  const [challenges, setChallenges] = useState({});
  const challengeDatasource = Container.get(ChallengeDatasource);

  useEffect(() => {
    challengeDatasource.getChallenges(setChallenges);
  }, [challengeDatasource]);

  return <div>${JSON.stringify(challenges)}</div>;
}

export default Challenge;