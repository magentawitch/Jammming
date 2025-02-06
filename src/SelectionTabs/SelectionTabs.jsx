import React, { useState } from "react"; 
import styles from "./SelectionTabs.module.css";

function SelectionTabs(props) {

    const setActiveTab = tab => {
        props.onTabSelection(tab);
    }

    return (
        <div className={styles.container}>
            <button className={props.activeTab === "resultsTab" ? styles.selectedButton : styles.unselectedButton} onClick={() => setActiveTab("resultsTab")}>Results</button>
            <button className={props.activeTab === "playlistTab" ? styles.selectedButton : styles.unselectedButton} onClick={() => setActiveTab("playlistTab")}>Playlist</button>
        </div>
    )
}

export default SelectionTabs;