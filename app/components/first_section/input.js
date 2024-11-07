import React, { useState, useEffect, useRef } from 'react';

function InputComponent({ handleSearch, setLoading}) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        let value = e.target.value.trim();

        const urlPrefix = "https://logs.tf/profile/";
        if (value.startsWith(urlPrefix)) {
            value = value.slice(urlPrefix.length); 
        }

        setInputValue(value);
    };

    const handleSearchClick = () => {
        if (inputValue.trim()) {
            handleSearch(inputValue); 
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchClick();
            setLoading("LOADING");
        }
    };
 
    return (
        <form> 
        <input 
                className="input"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter SteamID64"    
            /> 
            <img className="input-logo" src="logo.png" alt="Logo" />
        </form>
    ); 
}
export default InputComponent


// thing to call stuff
// <button onClick={handleSearchClick}>Search</button>
