import React, { useState, useEffect, ReactNode } from "react";
import { Container } from 'typedi';
import { Container as ReactContainer, Row, Col } from 'react-bootstrap';

import { BattleDatasource } from 'src/datasource/battle.datasource';
import { BattleModel } from "src/model";
import Trainer from "./Trainer";

const BattleList = () => {
  const [battles, setBattles] = useState([] as BattleModel[]);
  const battleDatasource = Container.get(BattleDatasource);

  useEffect(() => {
    battleDatasource.getBattles().then(res => {
      setBattles(res);
    });
  }, [battleDatasource]);

  return (
    <ReactContainer>
      <Row className="justify-content-lg-center">
        <Col xs="auto">
          {battles.map((battle: BattleModel) => {
            return (
              <div>
                <p>User</p>
                <Trainer trainer={battle.user} />
                <p>Opponent</p>
                <Trainer trainer={battle.user} />
                <p>Winner { battle.winnerId === battle.user.id ? battle.user.name : battle.opponent.name}</p>
              </div>
            );
          })}
        </Col>
      </Row>
    </ReactContainer>
  );
}

export default BattleList;