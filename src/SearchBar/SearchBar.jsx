import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar(props) {
    const [input, setInput] = useState("")

    const handleClick = () => {
        props.onUserInput(input);
    }

    return (
        <div className={styles.searchBar}>
            <form className={styles.searchBarForm} onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Search a song" className={styles.userInput} value={input} onChange={({target}) => setInput(target.value)}  />
            </form>
            <button className={styles.searchButton} onClick={handleClick}>SEARCH</button>
        </div>
    )
}

export default SearchBar;