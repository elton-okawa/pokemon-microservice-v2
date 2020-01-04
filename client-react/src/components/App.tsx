import React, { useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import ChallengeList from './ChallengeList';
import Login from './Login';
import NavBar from './NavBar';
import TrainerList from './TrainerList';
import BattleList from './BattleList';

const App: React.FC = () => {

  const [userId, setUserId] = useState();

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/battle-list">
            <BattleList />
          </Route>
          <Route path="/trainer-list">
            <TrainerList />
          </Route>
          <Route path="/challenge-list">
            <ChallengeList />
          </Route>
          <Route path="/login">
            <Login setUserId={setUserId} />
          </Route>
          <Route path="/">
            <h1>Logged as {userId}</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
