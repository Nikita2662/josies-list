import React, { useState } from "react";
import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./CreateAccount.css";
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App.js";

function CreateAccount() {
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [name, setName] = useState("");

  const location = useLocation();
  const email = location.state.email;

  const { setUser } = React.useContext(UserContext);

  const createUser = async () => {
    const body1 = {
      _id: email,
    };

    const response1 = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body1),
    });

    if (response1.status === 400) {
      throw new Error(
        "User already exists in database, I don't know how we got here"
      );
    }

    const body2 = {
      bio: bio,
      name: name,
    };

    const response2 = await fetch(`http://localhost:5000/users/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body2),
    });

    if (response2.status === 400) {
      throw new Error(
        "Somehow the user was not created but we got here anyways"
      );
    }

    let user = {
      _id: email,
      bio: bio,
      name: name,
    };

    setUser(user);
    navigate("/profile");
  };

  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <Header />
      <SafeArea>
        <div className="ca-container">
          <h1>Create Your Account</h1>
        </div>
        <div className="grid-container">
          <div className="grid-item">
            <div className="small-text">
              <h1>Profile Picture</h1>
            </div>
            <Button onClick={handleClick} className="photo-button">
              +
            </Button>
          </div>
          <div className="grid-item">
            <TextBox
              label="Name"
              placeholder="Josie Bruin"
              className="text-box-container-top"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextBox
              label="Email"
              className="text-box-container-bottom"
              value={email}
              disabled
            />
            <TextBox
              label="Biography"
              placeholder="Class of 1919, Rieber Hall"
              className="text-box-container-bottom"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button onClick={createUser} className="ca-button">
            create account
          </Button>
        </div>
      </SafeArea>
    </div>
  );
}

export default CreateAccount;
