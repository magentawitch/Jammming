import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar(props) {
    const [input, setInput] = useState("")

    const handleClick = () => {
        props.onUserInput(input);
        setInput("");
    }

    return (
        <div className={styles.searchBar}>
            <form className={styles.searchBarForm} onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Search a song" className={styles.userInput} value={input} onChange={({target}) => setInput(target.value)}  />
            </form>
            <button className={styles.searchButton} onClick={handleClick}><img className={styles.searchImg} src="public/search.png" /><span className={styles.buttonText}>SEARCH</span></button>
        </div>
    )
}

export default SearchBar;