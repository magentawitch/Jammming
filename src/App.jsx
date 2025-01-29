import { useState } from 'react'
import Header from './Header/Header';
import SearchBar from './SearchBar/SearchBar';
import Playlist from './Playlist/Playlist';
import SearchResults from './SearchResults/SearchResults';
import styles from './App.module.css'

function App() {
  const [playlist, setPlaylist] = useState([]);

  const handleAddTrack = (trackSelected) => {
    setPlaylist((prev) => [...prev, trackSelected]);
  }

  const handleRemoveTrack = (trackKeySelected) => {
    console.log({trackKeySelected, playlist})
    setPlaylist(prev => prev.filter((track, i) => i !== trackKeySelected))
  }


  return (
    <>
    <Header />
    <SearchBar />
    <div className={styles.tracklistsContainer}>
      <SearchResults onAddTrack={handleAddTrack} />
      <Playlist playlist={playlist} onRemoveTrack={handleRemoveTrack} />
    </div>

    </>
  )
}

export default App
