import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import SafeArea from "../components/SafeArea";
import Button from "../components/Button.js";
import profilepic from "../profilepic.png"
import Star from "../components/Star";
import Flag from "../components/Flag";
import ListedItem from "../components/ListedItem";
import empty from "../empty.png";
import "./Profile.css";

function Profile({userID}){

    const [user, setUser] = useState(null);
    const [listings, setListings] = useState([])

    // fetches the data from specific userID and places into user
    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch(`http://localhost:5000/users/${userID}`)
            const data = await response.json();
            setUser(data);
        };
        fetchData();
    }, [userID]);

    // TODO: get all listings relevant to specific userID

    // TODO: handle create listing for user 
    const handleClick = () => {
        alert('Button clicked!');
    };
    
    return (
        <div>
            <Header />
            <SafeArea>
                <div className="grid-container">
                    <div className="grid-item">
                        <img className="profile-photo" src={profilepic} alt="User profile photo" />
                    </div>
                    <div className="grid-item">
                        <h1 className="small-text">{user.username}</h1>
                        <h2 className="bio-text">{user.bio}</h2>
                        <div>
                            <Star className="star" fill="#FF1F58"/>
                            <Star className="star"/>
                            <Star className="star"/>
                            <Star className="star"/>
                            <Star className="star"/>
                        </div>
                    </div>
                </div>
                <div >
                    <Flag text="Listed Items" svgclass="flag" textclass="flag-text"/>
                </div>
                <div className="product-container">
                    <div className="product-item">
                        <ListedItem itemName="item" price="0" src={empty} ListedItem/>
                    </div>
                    <div className="product-item">
                        <Button onClick={handleClick} className="listing-button">+</Button>
                        <h2 className="listing-text">Item Name</h2>
                        <h2 className="price-text">$##</h2>
                    </div>
                </div>
            </SafeArea>
        </div>
    );

}

export default Profile;