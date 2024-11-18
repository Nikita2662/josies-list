import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import "./Listings.css";
import React, { useState } from 'react';
import Comment from "../components/Comments.js"
import Image from "../components/Uploadimage.js"

function Listings({className="listed-photo" , src , itemName , price, description}){
    

    return (
        <div>
            <Header/>
         <SafeArea>
    <div class="flex-container">
    <div class="flex1">
    <div > <Image w={370} h={270} /></div>
    <div style={{ flexGrow: 1 }}>2</div>
    </div>
    </div>

    <Comment productId={303}/>
    </SafeArea>
    </div>
    );
   

}

export default Listings;
