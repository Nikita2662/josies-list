import Header from "../components/Header.js";
import SafeArea from "../components/SafeArea.js";

import SearchIcon from "../components/icons/SearchIcon.js";

import "./Search.css";

//TODO - Integrate with backend search API
function Search() {
  return (
    <>
      <Header />
      <SafeArea>
        <div className="search-bar">
          <input placeholder="search" />
          <button>
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
      </SafeArea>
    </>
  );
}

export default Search;
