import "./App.css";
import React, { useState, useEffect } from "react";
import { googleLogout, GoogleLogin } from "@react-oauth/google";

function App() {
  const [user, setUser] = useState([]);

  function logout() {
    googleLogout();
    setUser(null);
    //define logout
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h4>Sign-In with Google</h4>
          <GoogleLogin
            onSuccess={() => console.log("logged in")}
            onError={() => console.log("error")}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
