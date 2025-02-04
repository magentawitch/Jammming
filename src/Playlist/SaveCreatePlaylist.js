import { getValidAccessToken } from "../Auth/token";

async function getUserId() {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
        console.error('No access token found. Please log in first.');
        return;
    }

    const endpoint = "https://api.spotify.com/v1/me";
    const payload = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await fetch(endpoint, payload)
        if (response.ok) {
            const data = await response.json();
            return data.id;
        }
    } catch (error) {
        console.error("Unable to get UserID");
    }
}


async function createPlaylist(title) {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
        console.error('No access token found. Please log in first.');
        return;
    }
    const userId = await getUserId();
    const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const createPlaylistPayload = {
        name: title,
        description: "",
        public: false
    };

    try {
        const response = await fetch(createPlaylistEndpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createPlaylistPayload)
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.id;
        }
        
    } catch (error) {
        console.error("Unable to create playlist");
    }
}

export async function savePlaylist(title, trackArray) {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
        console.error('No access token found. Please log in first.');
        return;
    }

    const playlistId = await createPlaylist(title);
    const savePlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const savePlaylistPayload = {
        uris: trackArray,
        position: 0
    } ;

    try {
        const response = await fetch(savePlaylistEndpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(savePlaylistPayload)
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error adding tracks to playlist", error)
    }
}

