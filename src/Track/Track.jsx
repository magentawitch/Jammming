import React from "react";
import styles from "./Track.module.css";

function Track(props) {
    const { track: { name, artist, album }, icon } = props;
    const trackInfo = `${artist} | ${album}`;


    const handleClick = () => {
        props.onTrackClick();
    }



    return (
        <div className={styles.track}>
            <div className={styles.trackData}>
                <p className={styles.trackTitle}>{name}</p>
                <div className={styles.trackInfoContainer}>
                    <p className={styles.trackInfo}>{trackInfo}</p>
                </div>
            </div>
            <div className={styles.trackIcon}>
                <button className={styles.addRemoveButton} onClick={handleClick}>{icon}</button>
            </div>
        </div>
    )
}

export default Track;