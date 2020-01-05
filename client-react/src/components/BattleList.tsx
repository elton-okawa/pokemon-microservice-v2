import React, { useState, useEffect, ReactNode } from "react";
import { Container } from 'typedi';

import { BattleDatasource } from 'src/datasource/battle.datasource';
import { BattleModel } from "src/model";
import Trainer from "./Trainer";
import './BattleList.css';
import HorizontalDivisor from "./HorizontalDivisor";

const BattleList = () => {
  const [battles, setBattles] = useState([] as BattleModel[]);
  const battleDatasource = Container.get(BattleDatasource);

  useEffect(() => {
    battleDatasource.getBattles().then(res => {
      setBattles(res);
    });
  }, [battleDatasource]);

  return (
    <div className="container grid-container">
      {battles.map((battle: BattleModel) => {
        return (
          <div>
            <div className={`item-1 ${battle.winnerId === battle.user.id ? 'winner' : 'loser'}`}>
              <p className="center-text">User</p>
              <Trainer trainer={battle.user} />
              <p className="center-text"><strong>{battle.winnerId === battle.user.id ? 'Winner' : 'Loser'}</strong></p>
            </div>
            <div className={`item-2 ${battle.winnerId === battle.opponent.id ? 'winner' : 'loser'}`}>
              <p className="center-text">Opponent</p>
              <Trainer trainer={battle.user} />
              <p className="center-text"><strong>{battle.winnerId === battle.opponent.id ? 'Winner' : 'Loser'}</strong></p>
            </div>
            <div className="item-row"><HorizontalDivisor /></div>
          </div>
        );
      })}
    </div >
  );
}

export default BattleList;
