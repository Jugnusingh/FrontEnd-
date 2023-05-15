import React, { useState } from 'react';
import "./index.css"

const SearchBar = ({ productData, onSearch }) => {
  const [isActive, setIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  }

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  }

  return (
    <div className={`search-bar${isActive ? ' active' : ''}`}>
      <input
        type="text"
        placeholder="Search"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
        value={searchQuery}
      />
      <button type="submit" onClick={handleSearch}>
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
}

export default SearchBar;
