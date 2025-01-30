import React, { useState } from "react";
import styles from "./Track.module.css";

function Track(props) {
    const { track: { name, artist, album, uri }, icon } = props;


    const handleClick = () => {
        props.onTrackClick();
    }



    return (
        <div className={styles.track}>
            <div className={styles.trackData}>
                <p className={styles.trackTitle}>{name}</p>
                <div className={styles.trackInfo}>
                    <p className={styles.trackArtist}>{artist}</p>
                    <p className={styles.trackAlbum}>{album}</p>
                </div>
            </div>
            <div className={styles.trackIcon}>
                <button className={styles.addRemoveButton} onClick={handleClick}>{icon}</button>
            </div>
        </div>
    )
}

export default Track;