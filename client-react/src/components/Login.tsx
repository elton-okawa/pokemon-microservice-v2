import React, { useState, useEffect, ReactNode } from "react";
import { Container } from 'typedi';

import { LoginDatasource } from 'src/datasource/login.datasource';

interface LoginProps {
  setUserId?: React.Dispatch<number>;
}

const Login = (props: LoginProps) => {
  const loginDatasource = Container.get(LoginDatasource);
  const [currentUserId, setCurrentUserId] = useState(0);

  const handleChange = (event) => {
    setCurrentUserId(event.target.value);
  }

  const handleSubmit = (event) => {
    loginDatasource.login(currentUserId).then(res => {
      props.setUserId?.(currentUserId);
    });
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Id:
          <input type="number" value={currentUserId} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;