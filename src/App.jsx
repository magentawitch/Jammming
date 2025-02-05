import { useState } from 'react'
import Header from './Header/Header';
import SearchBar from './SearchBar/SearchBar';
import SelectionTabs from './SelectionTabs/SelectionTabs';
import Playlist from './Playlist/Playlist';
import SearchResults from './SearchResults/SearchResults';
import { savePlaylist } from './Playlist/SaveCreatePlaylist';
import styles from './App.module.css'

function App() {
  const [playlist, setPlaylist] = useState([]);

  const [userInput, setUserInput] = useState();

  const handleAddTrack = (trackSelected) => {
    setPlaylist((prev) => [...prev, trackSelected]);
  }

  const handleRemoveTrack = (trackKeySelected) => {
    setPlaylist(prev => prev.filter((track, i) => i !== trackKeySelected))
  }

  const handleSavePlaylist = async (playlistTitle, uriPlaylist) => {
      await savePlaylist(playlistTitle, uriPlaylist);
      setPlaylist([]);
  }

  const handleUserInput = input => {
    setUserInput(input);
  }




  return (
    <>
    <Header />
    <SearchBar onUserInput={handleUserInput} />
    <SelectionTabs />
    <div className={styles.tracklistsContainer}>
      <SearchResults onAddTrack={handleAddTrack} userInput={userInput} />
      <Playlist playlist={playlist} onRemoveTrack={handleRemoveTrack} onSavePlaylist={handleSavePlaylist} />
    </div>

    </>
  )
}

export default App
