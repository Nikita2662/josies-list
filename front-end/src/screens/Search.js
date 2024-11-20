import { useState } from "react";

import Header from "../components/Header.js";
import SafeArea from "../components/SafeArea.js";
import ListedItem from "../components/ListedItem.js";

import SearchIcon from "../components/icons/SearchIcon.js";

import "./Search.css";

function displaySearchResults(data) {
  return data.map((item, index) => (
    <ListedItem
      key={index}
      className="listed-photo"
      src="https://placehold.co/265"
      itemName={item.itemName}
      price={item.price}
    />
  ));
}

async function getAllProducts() {
  let result = await fetch("http://localhost:5000/products");
  return await result.json();
}

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //TODO - Integrate with backend search API
  function getSearchResults(searchQuery) {
    getAllProducts().then((response) => {
      console.log(response);
      setSearchResults(response);
    });
  }

  return (
    <>
      <Header />
      <SafeArea>
        <div className="search-bar">
          <input
            placeholder="search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => getSearchResults(searchQuery)}>
            <SearchIcon size={50} />
          </button>
        </div>
        <select className="filters-button">
          <option value="" disabled selected>
            filters
          </option>
          <option value="none">None</option>
          <option value="clothing">Clothing</option>
          <option value="dorm">Dorm</option>
          <option value="tech">Tech</option>
        </select>
        <div className="search-results">
          {displaySearchResults(searchResults)}
        </div>
      </SafeArea>
    </>
  );
}

export default Search;
