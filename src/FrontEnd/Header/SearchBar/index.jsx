import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    // Perform search logic here
    console.log('Searching for:', searchText);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}> <i className="material-icons">
        </i></button>
    
    </div>
  );
};

export default SearchBar;