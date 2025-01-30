import React from "react";
import styles from "./SearchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults(props) {
    const trackArray = [
        {
            name: "How far ill go",
            artist: "Aurii Carvalho",
            album: "Moana",
            uri: 1,
        },
        {
            name: "Let it go",
            artist: "Idina Menzel",
            album: "Frozen",
            uri: 2,
    
        }
    ]

    const handleTrackClick = (track) => {
        props.onAddTrack(track);
    }

    

    return (
        <div className={styles.container}>
            <Tracklist icon="+" trackArray={trackArray} onTrackClick={handleTrackClick} />
        </div>
    )
}

export default SearchResults;