import React from 'react';
import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./CreateAccount.css";
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js";

function CreateAccount(){
    
    const handleClick = () => {
        alert('Button clicked!');
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
                        <Button onClick={handleClick} className="photo-button">+</Button>
                    </div>
                    <div className="grid-item">
                        <TextBox label="First Name" placeholder="Josie" className="text-box-container-top" />
                        <TextBox label="Last Name" placeholder="Bruin" className="text-box-container-bottom" />  
                        <TextBox label="Biography" placeholder="Class of 1919, Rieber Hall" className="text-box-container-bottom" />
                    </div>
                </div>
                <div>
                    <Button onClick={handleClick} className="ca-button">create account</Button>
                </div>
                
            </SafeArea>
       </div>
   );

}


export default CreateAccount;