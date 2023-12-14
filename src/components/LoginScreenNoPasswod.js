import React, { useState } from "react";
import { useDispatch } from "react-redux";
import loginActionNoPassword from "../actions/loginActionNoPassword";
import "../css/Login-screen-no-password.css";
import { LOGIN_ACTION, SIGN_UP } from "../helpers/actionTypes";
import getImage from "../helpers/getImage";
const user = getImage("login-user.png");

export function LoginScreen() {
  const dispatch = useDispatch();
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  const [state, setState] = useState({
    showLoading: false,
    showLogin: true,
    showWelcome: false,
    error: false,
    message: "",
  });

  function isVlaidUsername(name ){
    if( name === undefined || name === null || name === "" || name.length<1)
    return false;
    return true;
  }
  function isValidPassword(pass){
    if( pass === undefined || pass === null || pass === "" || pass.length<1)
    return false;
    return true;
  }
  function onLogin() {
    const name = usernameRef.current.value;
    const password = passwordRef.current.value;

    if ( ! isVlaidUsername( name) ) {
      showLoadingScreen();
      return setTimeout(
        () => showErrorMessage("Please enter a valid username"),
        1000
      );
    }

    if ( ! isValidPassword( password ) ) {
      showLoadingScreen();
      return setTimeout(
        () => showErrorMessage("Please enter a valid password"),
        1000
      );
    }

    showLoadingScreen();
    setTimeout(() => {
      dispatch(
        loginActionNoPassword({
          type: LOGIN_ACTION,
          user: { userName: name, password: password },
          showLoginScreen: showLoginScreen,
          showWelcomeScreen: showWelcomeScreen,
          showErrorMessage: showErrorMessage,
          //user: { userName: userName, password: password },
        })
      );
    }, 2000);
  }

  function onSignUp() {
    const name = usernameRef.current.value;
    const password = passwordRef.current.value;
    showLoadingScreen();
    setTimeout(() => {
      dispatch(
        loginActionNoPassword({
          type: SIGN_UP,
          user: { userName: name, password: password },
          showLoginScreen: showLoginScreen,
          showWelcomeScreen: showWelcomeScreen,
          showErrorMessage: showErrorMessage,
          //user: { userName: userName, password: password },
        })
      );
    }, 2000);
  }

  function showLoadingScreen() {
    setState({
      showLoading: true,
      showLogin: false,
      showWelcome: false,
      error: false,
    });
  }
  function showWelcomeScreen() {
    setState({
      showLoading: false,
      showLogin: false,
      showWelcome: true,
      error: false,
    });
  }
  function showLoginScreen() {
    setState({
      showLoading: false,
      showLogin: true,
      showWelcome: false,
      error: false,
    });
  }
  function showErrorMessage(message) {
    setState({
      showLoading: false,
      showLogin: false,
      showWelcome: false,
      error: true,
      message: message,
    });
  }
  function hideErrorMessage() {
    setState({ ...state, showLogin: true, error: false });
  }

  //return loading();
  if (state.error) return errorMessageScreen();
  if (state.showLogin) return login();
  if (state.showLoading) return loading();
  if (state.showWelcome) return welcome();

  function loading() {
    return (
      <div className="outer-container">
        <div id="background" className="bg"></div>

        <div id="centercontainer">
          <div className="loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      </div>
    );
  }

  function login() {
    return (
      <div className="outer-container">
        <div className="bg"></div>

        <div id="centercontainer">
          <img id="userpic" alt="user" src={user} />

          <div className="welcome-text" style={{ fontSize: "2rem" }}>
            Guest User
          </div>

          <input
            type="text"
            className="userinput"
            placeholder="Username"
            id="loginUsername"
            defaultValue=""
            ref={usernameRef}
          />
          <input
            type="password"
            className="userinput"
            placeholder="Password"
            id="loginPassword"
            defaultValue=""
            ref={passwordRef}
          />

          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="button"
              className="login-button"
              value="Login"
              id="loginButton"
              
              onClick={() => {
                onLogin();
              }}
            />

            <input
              type="button"
              className="login-button"
              value="SIGNUP"
              id="loginButton"
              onClick={() => {
                onSignUp();
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  function errorMessageScreen() {
    return (
      <div className="outer-container">
        <div className="bg"></div>

        <div id="centercontainer">
          <img id="userpic" alt="user" src={user} />

          <div className="welcome-text" style={{ fontSize: "1rem" }}>
            {state.message}
          </div>

          <input
            type="button"
            className="login-button"
            value="OK"
            id="loginButton"
            style={{
              width: "100px",
              background: "transparent",
              color: "white",
              fontSize: " 1.2rem",
              border: "1px solid white",
              height: "38px",
              backgroundColor: " rgba(255,255,255,.15)",
              cursor: "pointer",
            }}
            onClick={() => {
              hideErrorMessage();
            }}
          />
        </div>
      </div>
    );
  }
  /*
 
*/

  function welcome() {
    return (
      <div className="outer-container">
        <div className="bg"></div>

        <div id="centercontainer">
          <div
            className="user-container"
            style={{
              justifyContent: "center",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              className="welcome"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>

              <div className="welcome-text">Welcome Guest</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  /*

*/
}
