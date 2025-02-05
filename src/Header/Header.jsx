import React from "react";
import styles from "./Header.module.css";

function Header() {
    return (
        <div className={styles.header}>
            <h1 className={styles.logo}>Ja<span className={styles.accentColor}>mmm</span>ing</h1>
        </div>
    )
}

export default Header;