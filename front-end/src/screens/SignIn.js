import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

import Header from "../components/Header";
import BlueFlag from "../components/blueFlag.png";
import GreenFlag from "../components/greenFlag.png";
import Logo from "../components/Logo";
import SafeArea from "../components/SafeArea";
import { UserContext } from "../App.js";

import "./SignIn.css";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const { setUser } = React.useContext(UserContext);

  const createAccountClick = useGoogleLogin({
    onSuccess: (tokenResponse) => signInButtonClick(tokenResponse),
  });

  async function signInButtonClick(tokenResponse) {
    //get the email
    let accessToken = tokenResponse.access_token;
    let response = await fetch(
      "https://oauth2.googleapis.com/tokeninfo?access_token=" + accessToken
    );
    let data = await response.json();
    let email = data.email;

    //check if the user exists in the database
    let response2 = await fetch("http://localhost:5000/users/" + email, {
      method: "GET",
    });
    let data2 = await response2.json();
    console.log(data2);
    if (data2) {
      //user exists, navigate to the profile page
      setUser(data2);
      navigate("/profile");
    } else {
      //user does not exist, navigate to the create account page
      navigate("/create-account", { state: { email: email } });
    }
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
            <button
              className="button sign-in"
              onClick={() => createAccountClick()}
            >
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
