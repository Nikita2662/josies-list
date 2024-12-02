import { useState, useContext } from "react";
import Header from "../components/Header.js";
import SafeArea from "../components/SafeArea.js";
import ListedItem from "../components/ListedItem.js";
import { Navigate } from "react-router-dom";

import SearchIcon from "../components/icons/SearchIcon.js";
import { UserContext } from "../App.js";

import "./Search.css";

function displaySearchResults(data) {
  if (typeof data === "string") {
    return <h1>{data}</h1>;
  }

  return data.map((item, index) => (
    <ListedItem
      key={index}
      className="listed-photo"
      src={item.image}
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

  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  async function getSearchResults(searchQuery, tag) {
    let result = await fetch(
      "http://localhost:5038/search?SearchQuery=" + searchQuery + "&tags=" + tag
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
          defaultValue={"none"}
        >
          <option value="none">None</option>
          <option value="clothing">Clothing</option>
          <option value="dorm">Dorm</option>
          <option value="textbook">Textbook</option>
        </select>
        <div className="search-results">
          {displaySearchResults(searchResults)}
        </div>
      </SafeArea>
    </>
  );
}

export default Search;
