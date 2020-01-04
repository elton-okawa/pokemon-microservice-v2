import React from 'react';
import {
  Link,
  Router,
} from "react-router-dom";

import './NavBar.css';

const NavBar = () => {

  return (
    <div className="topnav">
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      <Link to='/challenge-list'>Challenge-List</Link>
      <Link to='/trainer-list'>Trainer-List</Link>
      <Link to='/battle-list'>Battle-List</Link>
    </div>
  );
}

export default NavBar;
