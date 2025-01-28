import { useState } from 'react'
import SearchBar from './SearchBar/SearchBar';
import Playlist from './Playlist/Playlist';
import SearchResults from './SearchResults/SearchResults';
import styles from './App.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className={styles.header}>
      <h1 className={styles.logo}>Jammming</h1>
    </div>
    <SearchBar />
    <div className={styles.tracklistsContainer}>
      <SearchResults />
      <Playlist />
    </div>

    </>
  )
}

export default App
