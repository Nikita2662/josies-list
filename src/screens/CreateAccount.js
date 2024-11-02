import React from 'react';
import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./CreateAccount.css";
import AddPhoto from "../components/AddPhoto.js";

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
                <div className="small-text">
                    <h1>profile picture</h1>
                    <h2>first name</h2>
                </div>
                <div>
                    <AddPhoto onClick={handleClick}>+</AddPhoto>
                </div>
            </SafeArea>
       </div>
   );

}


export default CreateAccount;