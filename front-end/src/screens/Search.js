import Header from "../components/Header.js";
import SafeArea from "../components/SafeArea.js";
import ListedItem from "../components/ListedItem.js";

import SearchIcon from "../components/icons/SearchIcon.js";

import "./Search.css";

function searchResults(data) {
  return data.map((item, index) => (
    <ListedItem
      key={index}
      className="listed-photo"
      src="https://via.placeholder.com/150"
      itemName={item.itemName}
      price={item.price}
    />
  ));
}

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
        <div className="search-results">{searchResults(dummyData)}</div>
      </SafeArea>
    </>
  );
}

const dummyData = [
  {
    itemName: "Mountain Bike",
    description: "A gently used mountain bike, perfect for trails.",
    price: 250,
    seller: "JohnDoe123",
  },
  {
    itemName: "Office Desk",
    description: "A large oak desk with plenty of storage space.",
    price: 120,
    seller: "JaneSmith87",
  },
  {
    itemName: "Laptop",
    description: "Dell XPS 13, 8GB RAM, 256GB SSD, excellent condition.",
    price: 650,
    seller: "TechieMike",
  },
  {
    itemName: "Guitar",
    description: "Fender Stratocaster electric guitar, barely used.",
    price: 700,
    seller: "MusicMan99",
  },
  {
    itemName: "Dining Table",
    description: "Solid wood dining table with 4 chairs.",
    price: 300,
    seller: "HomeMaker22",
  },
  {
    itemName: "Microwave",
    description: "Samsung microwave, 900W, lightly used.",
    price: 50,
    seller: "ApplianceGuru",
  },
  {
    itemName: "Used Textbooks",
    description: "A collection of college textbooks, great for students.",
    price: 75,
    seller: "StudentDeals",
  },
  {
    itemName: "TV Stand",
    description: "Modern TV stand, fits up to 65-inch TVs.",
    price: 80,
    seller: "FurniMan",
  },
  {
    itemName: "Baby Stroller",
    description: "Lightweight and compact stroller, good condition.",
    price: 100,
    seller: "MomLife",
  },
  {
    itemName: "Garden Tools",
    description: "Set of garden tools including shovel, rake, and gloves.",
    price: 40,
    seller: "GreenThumb",
  },
];

export default Search;
