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
                    <h1>create your account</h1>      
                </div>
                <div className="grid-container">
                    <div className="grid-item">
                        <div className="small-text">
                            <h1>profile picture</h1>
                        </div>
                        <Button onClick={handleClick} className="photo-button">+</Button>
                    </div>
                    <div className="grid-item">
                        <TextBox label="first name" placeholder="" className="text-box-container-top" />
                        <TextBox label="last name" placeholder="" className="text-box-container-bottom" />  
                        <TextBox label="biography" placeholder="" className="text-box-container-bottom" />
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