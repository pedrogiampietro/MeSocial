import React, { useContext, useRef } from 'react';
import './styles.css';

import { AuthContext } from '../../context/AuthContext';
import { loginCall } from '../../apiCalls';

export function Login() {
  const email = React.useRef();
  const password = React.useRef();
  const { user, isFecthing, error, dispatch } = useContext(AuthContext);

  const handleClick = e => {
    e.preventDefault();

    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">meSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on meSocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              minLength="6"
              ref={password}
              required
            />
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
