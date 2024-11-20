import React, { useState }  from 'react';
import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./CreateAccount.css";
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js";

function CreateAccount({userID}){

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [filename, setFilename] = useState('');

    // TODO: should send to user profile after updating
    const updateUser = async(event) => {
        event.preventDefault();
        
        try {
            const updatedUser = {
                username: username,
                bio: bio,
            };

            const response = await fetch(`http://localhost:5000/users/${userID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Send data as JSON
                },
                body: JSON.stringify(updatedUser), // Convert object to JSON string
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const data = await response.json(); 
            console.log('User updated successfully:', data);
            alert(`User updated: ${username}`);

        } catch (error) {
            console.error('Error sending data:', error)
            alert('Failed to update user.');
        }

    };

    // TODO: send image to backend to link to user
    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFilename(event.target.files[0].name);
            setSelectedFile(event.target.files[0]);
        }
    }
    
    // TODO: change username to first & last name when niki updates backend
    
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
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                id="profile-pic-file"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="profile-pic-file">
                                <Button onClick={handleFileChange} className="photo-button">+</Button>
                            </label>
                        </div>
                    </div>
                    <div className="grid-item">
                        <TextBox 
                            label="First Name" 
                            placeholder="Josie" 
                            className="text-box-container-top" 
                        />
                        <TextBox 
                            label="Last Name" 
                            placeholder="Bruin" 
                            className="text-box-container-bottom" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <Button onClick={updateUser} className="ca-button">create account</Button>
                </div>
                
            </SafeArea>
       </div>
   );

}


export default CreateAccount;