import React from 'react';
import './SearchBar.css';

function SearchBar ( { search, disabled } ) {
    const handleSearch = ( e ) => {
        search( e );
    };

    return (
        <div className="search-bar">
            <input type="text" placeholder="ابحث هنا" onChange={handleSearch} disabled={disabled}/>
        </div>
    );
}

export default SearchBar;