import Header from "../components/Header.js";
import SafeArea from "../components/SafeArea.js";

import SearchIcon from "../components/icons/SearchIcon.js";

import "./Search.css";

function Search() {
  return (
    <>
      <Header />
      <SafeArea>
        <div className="search-bar">
          <input placeholder="search"></input>
          <button>
            <SearchIcon size={50} />
          </button>
        </div>
      </SafeArea>
    </>
  );
}

export default Search;
