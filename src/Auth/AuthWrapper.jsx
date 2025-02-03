import React, { useEffect, useState } from "react";
import loginWithSpotify from "./login";
import { getToken } from "./token";
import App from "../App";

function AuthWrapper() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));

    useEffect(() => {
        const checkToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");

            if (!accessToken && !code) {
                loginWithSpotify();
            }

            if (code && !accessToken) {
                const newToken = await getToken(code);
                if (newToken !== null) {
                    setAccessToken(newToken);
                } else {
                    window.location.reload();
                }

            }
        }
        checkToken();
    }, []);

    if (accessToken) {
        return (
            <App token={accessToken} />
        )
    } else {
        return (
            <p>Llora</p>
        )
    }

}


/* 
function AuthWrapper() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"))

    useEffect(() => {
        const checkToken = async () => {

            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");

            if (!accessToken && !code) {
                loginWithSpotify();
            }

            if (code && !accessToken) {
                const newToken = await getToken(code);
                if (newToken) setAccessToken(newToken);
            }

            if (accessToken) {
                const validToken = await getValidAccessToken();
                if (validToken) setAccessToken(validToken)

            }

        }

        checkToken();
    }, [accessToken]);

    if (accessToken) {
        return (
            <App token={accessToken} />
        )
    } else {
        return (
            <p>Llora</p>
        )
    }

} */

export default AuthWrapper;