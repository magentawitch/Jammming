import React from "react";
import styles from "./Track.module.css";

function Track(props) {

    const {name, artist, album} = props;

    return (
        <div className={styles.track}>
            <p className={styles.trackTitle}>{name}</p>
            <div className={styles.trackInfo}>
            <p className={styles.trackArtist}>{artist}</p>
            <p className={styles.trackAlbum}>{album}</p>
            </div>
        </div>
    )
}

export default Track;