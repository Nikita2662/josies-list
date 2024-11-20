import React, { useState } from "react";
import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./CreateAccount.css";
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js";
import { useLocation } from "react-router-dom";

function CreateAccount() {
  // add app.use(express.json()); in backend? for JSON input

  const [bio, setBio] = useState("");
  const location = useLocation();
  const email = location.state.email;

  const createUser = async (event) => {
    event.preventDefault();

    try {
      const updatedUser = {
        username: email,
        bio: bio,
      };

      const response = await fetch(`http://localhost:5000/users/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Send data as JSON
        },
        body: JSON.stringify(updatedUser), // Convert object to JSON string
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      console.log("User updated successfully:", data);
      alert(`User updated: ${email}`);
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to update user.");
    }
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
