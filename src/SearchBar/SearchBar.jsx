import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar() {
    const [input, setInput] = useState("")

    return (
        <div className={styles.searchBar}>
            <form className={styles.searchBarForm} onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Search a song" className={styles.userInput} value={input} onChange={({target}) => setInput(target.value)}  />
            </form>
            <button className={styles.searchButton}>SEARCH</button>
        </div>
    )
}

export default SearchBar;