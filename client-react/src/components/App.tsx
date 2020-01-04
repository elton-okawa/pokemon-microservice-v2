import React, { useState } from 'react';

import './App.css';
import Challenge from './Challenge';
import Login from './Login';

const App: React.FC = () => {

  const [userId, setUserId] = useState();

  return (
    <div className="App">
      {renderComponents(userId, setUserId)}
    </div>
  );
}

function renderComponents(userId?: number, setUserId?: React.Dispatch<number>) {
  if (userId) {
    return (
      <Challenge />
    );
  } else {
    return (
      <Login setUserId={setUserId} />
    );
  }
}

export default App;
