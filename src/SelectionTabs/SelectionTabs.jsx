import React, { useState } from "react"; 
import styles from "./SelectionTabs.module.css";

function SelectionTabs(props) {
    const [currentButton, setCurrentButton] = useState("resultsButton");


    const setActiveTab = buttonType => {
        setCurrentButton(buttonType);
    }

    return (
        <div className={styles.container}>
            <button className={currentButton === "resultsButton" ? styles.selectedButton : styles.unselectedButton} onClick={() => setActiveTab("resultsButton")}>Results</button>
            <button className={currentButton === "playlistButton" ? styles.selectedButton : styles.unselectedButton} onClick={() => setActiveTab("playlistButton")}>Playlist</button>
        </div>
    )
}

export default SelectionTabs;