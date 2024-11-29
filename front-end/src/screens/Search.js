import { useState } from "react";

import Header from "../components/Header.js";
import SafeArea from "../components/SafeArea.js";
import ListedItem from "../components/ListedItem.js";

import SearchIcon from "../components/icons/SearchIcon.js";

import "./Search.css";

function displaySearchResults(data) {
  if (typeof data === "string") {
    return <h1>{data}</h1>;
  }

  return data.map((item, index) => (
    <ListedItem
      key={index}
      className="listed-photo"
      src="https://placehold.co/265"
      itemName={item.itemName}
      price={item.price}
      _id={item._id}
    />
  ));
}

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tag, setTag] = useState("");

  async function getSearchResults(searchQuery, tag) {
    let result = await fetch(
      "http://localhost:5000/search?SearchQuery=" + searchQuery + "&tags=" + tag
    );
    let data = await result.json();
    setSearchResults(data);
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
          <button onClick={() => getSearchResults(searchQuery, tag)}>
            <SearchIcon size={50} />
          </button>
        </div>
        <select
          className="filters-button"
          onChange={(e) => setTag(e.target.value)}
        >
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
