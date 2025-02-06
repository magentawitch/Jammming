import React, { useState } from "react";
import Tracklist from "../Tracklist/Tracklist";
import styles from "./Playlist.module.css";

function Playlist(props) {
    const [playlistTitle, setPlaylistTitle] = useState("");

    const handleTrackClick = (_, position) => {
        props.onRemoveTrack(position);
    }

    const handleSaveClick = () => {
        if (props.playlist.length > 0 && playlistTitle) {
            const uriPlaylist = props.playlist.map(track => track.uri);
            props.onSavePlaylist(playlistTitle, uriPlaylist);
            setPlaylistTitle("");
        } else {
            alert("You cannot save an empty or unnamed playlist")
        }  
    }



    return (
        <div className={props.isSmallScreen ?  props.activeTab === "playlistTab" ? styles.container : styles.hide : styles.container}>
            <form onSubmit={e => e.preventDefault()}>
                <input className={styles.inputTitle} type="text" placeholder="Unnamed Playlist" value={playlistTitle} onChange={({ target }) => setPlaylistTitle(target.value)} />
            </form>
            <div>
            {props.playlist.length > 0 && (
                <Tracklist icon="-" trackArray={props.playlist} onTrackClick={handleTrackClick} />
            )}
            </div>
            <button onClick={handleSaveClick}>SAVE TO SPOTIFY</button>

        </div>
    )
}

export default Playlist;