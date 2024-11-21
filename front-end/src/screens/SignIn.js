import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

import Header from "../components/Header";
import BlueFlag from "../components/blueFlag.png";
import GreenFlag from "../components/greenFlag.png";
import Logo from "../components/Logo";
import SafeArea from "../components/SafeArea";

import "./SignIn.css";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const createAccountClick = useGoogleLogin({
    onSuccess: (tokenResponse) => createAccount(tokenResponse),
  });

  async function createAccount(tokenResponse) {
    //get the email
    let accessToken = tokenResponse.access_token;
    let response = await fetch(
      "https://oauth2.googleapis.com/tokeninfo?access_token=" + accessToken
    );
    let data = await response.json();
    let email = data.email;
    console.log(email);

    //create an account on the backend
    navigate("/create-account", { state: { email: email } });
  }

  return (
    <>
      <Header />
      <SafeArea>
        <header className="header">
          <div className="column-left">
            <p className="p-welcome"> welcome to</p>
            <h1 className="head-title">Josie's List</h1>
            <p className="p-byUcla"> made by UCLA students</p>
            <p className="p-forUcla"> for UCLA students</p>
            <img src={GreenFlag} className="greenFlag" alt="" />
            <Logo size={150} className="p-logo" />
          </div>
          <div className="column-right">
            <p className="p-sign">sign in</p>
            <img src={BlueFlag} alt="" />
            <p className="p-google"> with google (@g.ucla.edu)</p>
            <button className="button sign-in" onClick={() => alert("Sign In")}>
              Sign In
            </button>
            <p className="button p-or">-or-</p>
            <button
              className="button create-account"
              onClick={() => createAccountClick()}
            >
              Create An Account
            </button>
          </div>
        </header>
      </SafeArea>
    </>
  );
}

export default SignIn;
