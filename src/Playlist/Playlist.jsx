import React, { useEffect, useState } from "react";
import Tracklist from "../Tracklist/Tracklist";
import styles from "./Playlist.module.css";

function Playlist(props) {
    const [playlistTitle, setPlaylistTitle] = useState("");

    const handleTrackClick = (_, position) => {
        props.onRemoveTrack(position);
    }


    return (
        <div className={styles.container}>
            <form onSubmit={e => e.preventDefault()}>
                <input type="text" value={playlistTitle} onChange={({target}) => setPlaylistTitle(target.value)} />
            </form>
            {props.playlist.length > 0 && (
            <Tracklist icon="-" trackArray={props.playlist} onTrackClick={handleTrackClick} />
        )}
            
            <button>SAVE TO SPOTIFY</button>

        </div>
    )
}

export default Playlist;