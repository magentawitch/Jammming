import React, { useState } from "react";
import styles from "./Playlist.module.css";

function Playlist() {
    const [playlistTitle, setPlaylistTitle] = useState("");
    return (
        <div className={styles.container}>
            <form onSubmit={e => e.preventDefault()}>
                <input type="text" value={playlistTitle} onChange={({target}) => setPlaylistTitle(target.value)} />
            </form>
            <button>SAVE TO SPOTIFY</button>

        </div>
    )
}

export default Playlist;