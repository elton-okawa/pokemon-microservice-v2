import React from "react";

import { ChallengeModel } from "src/model";
import Trainer from "./Trainer";

interface ChallengeProps {
  challenge: ChallengeModel,
}

const Challenge = (props: ChallengeProps) => {
  const { user, opponent, status } = props.challenge;

  return (
    <ul className={`inline-list-items flex ${status}`}>
      <li key="challenge-1">
        <Trainer trainer={user} />
      </li>
      <div id="versus-container">
        <img id="versus" src="https://www.pikpng.com/pngl/b/28-280006_versus-logo-png-vs-bodyboards-transparent-png.png"/>
      </div>
      <li key="challenge-2">
        <Trainer trainer={opponent} />
      </li>
    </ul>
  );
}

export default Challenge;