import React, { useState } from "react";
import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./CreateAccount.css";
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App.js";
import UploadImage from "../components/Uploadimage.js";

// build create account page for new users
function CreateAccount() {
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const location = useLocation();
  const email = location.state.email;

  const { setUser } = React.useContext(UserContext);

  // create user object when page submitted
  const createUser = async () => {
    const body1 = {
      _id: email,
      username: name,
      bio: bio,
      picture: image,
    };

    // fetch from backend database the create user tool
    const response1 = await fetch("http://localhost:5038/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body1),
    });

    let result = await response1.json();

    if (!response1.ok) {
      alert(result.message);
      return;
    }

    // when user created, navigate to profile
    setUser(body1);
    navigate("/profile");
  };

  // when image button clicked, upload image
  const handleClick = (image) => {
    setImage(image);
  };

  // create page frontend with two textbooks taking in name/bio, image upload, and create account button
  return (
    <div>
      <Header />
      <SafeArea>
        <div className="ca-container">
          <h1>Create Your Account</h1>
        </div>
        <div className="grid-container-ca">
          <div className="grid-item">
            <div className="small-text-ca">
              <h1>Profile Picture</h1>
            </div>

            <UploadImage onImageChange={handleClick} />
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
