import React, { useEffect, useState } from "react";
import styles from "./SearchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";
import { getValidAccessToken } from "../Auth/token";

function SearchResults(props) {
    const [trackArray, setTrackArray] = useState([]);

    useEffect(() => {
        searchTrack();
    }, [props.userInput])



    const searchTrack = async () => {
        if (props.userInput !== undefined) {
            const accessToken = await getValidAccessToken();
            if (!accessToken) {
                console.error('No access token found. Please log in first.');
                return;
            }

            const url = "https://api.spotify.com/v1/search?q=";
            const type = "type=track"
            const limit = "limit=10";
            const searchQuery = props.userInput.replace(" ", "+");
            const endpoint = `${url}${searchQuery}&${type}&${limit}`;
            const payload = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            };

            try {
                const response = await fetch(endpoint, payload);

                if (response.ok) {
                    const data = await response.json();
                    const formattedTracks = data.tracks.items.map((track) => ({
                        name: track.name,
                        artist: track.artists.map((artist) => artist.name).join(', '),
                        album: track.album.name,
                        uri: track.uri,
                    }));
                    setTrackArray(formattedTracks);
                }
                if (response.status === 401 || response.status === 403) {
                    windows.location.reload();
                }

            } catch (error) {
                console.error('Failed to fetch tracks:', error);
            }
        }
    }


    const handleTrackClick = (track) => {
        props.onAddTrack(track);
    }



    return (
        <div className={props.isSmallScreen ?  props.activeTab === "resultsTab" ? styles.container : styles.hide : styles.container}>
            <div className={styles.titleContainer}>
            <h2 className={styles.sectionTitle}>Results</h2>
            </div>
            <Tracklist icon="+" trackArray={trackArray} onTrackClick={handleTrackClick} />
        </div>
    )
}

export default SearchResults;