
const clientId = "51c73e012cbe4b28bca899bbaa2f15bc";
const redirectUri = "http://localhost:5173/";
const url = 'https://accounts.spotify.com/api/token';

export async function getToken(code) {
    let codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
    };

    const body = await fetch(url, payload);
    const response = await body.json();

    if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
        localStorage.setItem("token_expiry", Date.now() + response.expires_in * 1000);
        return response.access_token;
    } else {
        console.error("Error: couldn't obtain token", response);
        return null
    }
};

const refreshToken = async () => {

    const refreshToken = localStorage.getItem('refresh_token');
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
        }),
    }
    const response = await fetch(url, payload);
    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem("token_expiry", Date.now() + data.expires_in * 1000);

        if (data.refresh_token) {
            localStorage.setItem('refresh_token', data.refresh_token);
        }
    }


    return data.access_token;
}




export async function getValidAccessToken() {
    const expiryTime = localStorage.getItem("token_expiry");

    if (!expiryTime || Date.now() > expiryTime) {
        return await refreshToken();
    }

    return localStorage.getItem("access_token");
}

