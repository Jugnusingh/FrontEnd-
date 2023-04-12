
import React, { useState } from 'react';
import "./index.css"

const SearchBar = ()=>{
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <div className={`search-bar${isActive ? ' active' : ''}`}>
      <input
        type="text"
        placeholder="Search"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button type="submit">
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
}

export default SearchBar;