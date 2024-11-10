import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./Listings.css";
import React, { useState } from 'react';

function Listings(){


    return (
        <div>
            <Header/>
         <SafeArea>
    <div class="flex-container">
    <div class="flex1">
    <div style={{ flexGrow: 0 }}>1</div>
    <div style={{ flexGrow: 1 }}>2</div>
    </div>
    <div class="flex2"> <div style={{ flexGrow: 8 }}>3</div> </div>
    
    </div>
    </SafeArea>
    </div>
    );
   

}

export default Listings;
