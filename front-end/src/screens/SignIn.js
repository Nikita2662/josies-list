import Header from "../components/Header";
import BlueFlag from "../components/blueFlag.png";
import GreenFlag from "../components/greenFlag.png";
import Logo from "../components/Logo";


import './SignIn.css';
import React, { useState } from 'react';




function SignIn() {
  const [activeTab, setActiveTab] = useState(null);
  function openTab(tab) {
    setActiveTab(tab);
}

  return (
    <div>
     <Header /> 
      <header className="header">
        <div className="column-left">
          <p className="p-welcome"> welcome to</p>
          <h1 className="head-title">Josie's List</h1>
          <p className="p-byUcla" > made by UCLA students</p>
          <p className="p-forUcla" > for UCLA students</p>
          <img  src={GreenFlag} className ="greenFlag"alt="Description of the image" />
          <Logo size={150} className="p-logo" />
          </div>

     
          <div>
              {activeTab === 'tab1' && <div className="tab"> Sign In tab</div>}
              {activeTab === 'tab2' && <div className="tab">Create an Account Tab</div>}
            </div>
     
     
        <div className="column-right">
          <p className="p-sign" >sign in</p>
          <img src={BlueFlag} alt="Description of the image" />
          <p className="p-google" > with google (@g.ucla.edu)</p>
          <button className="button sign-in" onClick={() => openTab('tab1')}>Sign In</button>
          <p className="button p-or" >-or-</p>
          <button className="button create-account" onClick={() => openTab('tab2')}>Create An Account</button>
          
        </div>
       
     
      </header>
    </div>
  );
}


export default SignIn;