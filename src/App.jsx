import { useState, useEffect } from 'react'
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
  const [activeTab, setActiveTab] = useState("resultsTab");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 910);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 910);
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleTabSelection = tab => {
      setActiveTab(tab);
  }




  return (
    <>
    <Header />
    <SearchBar onUserInput={handleUserInput} />
    <SelectionTabs onTabSelection={handleTabSelection} activeTab={activeTab}/>
    <div className={styles.tracklistsContainer}>
      <SearchResults onAddTrack={handleAddTrack} userInput={userInput}  activeTab={activeTab} isSmallScreen={isSmallScreen} />
      <Playlist playlist={playlist} onRemoveTrack={handleRemoveTrack} onSavePlaylist={handleSavePlaylist} activeTab={activeTab} isSmallScreen={isSmallScreen} />
    </div>

    </>
  )
}

export default App
