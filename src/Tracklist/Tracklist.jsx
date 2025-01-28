import React from "react";
import Track from "../Track/Track";

function Tracklist() {

    return (
        <div>
            {trackArray.map((track) => 
            <Track 
            key={track.id}
            name={track.name}
            artist={track.artist}
            album={track.album}
            />
            )}
        </div>
    )
}

export default Tracklist;


const trackArray = [
    {
        name: "How far ill go",
        artist: "Aurii Carvalho",
        album: "Moana",
        id: 1,
    },
    {
        name: "Let it go",
        artist: "Idina Menzel",
        album: "Frozen",
        id: 1,

    }
]


/* function Example() {
  return (
    <App>
        <SearchBar/>
        <Columns>
            <SearchResults>
                <Tracklist>
                    <Track icon={"+"} onIconClicked={...}/>
                    <Track />
                    <Track />
                    <Track />
                    <Track />
                </Tracklist>
            </SearchResults>
            <Playlist>
                <Tracklist>
                    <Track  icon={"-"} onIconClicked={...}/>
                    <Track />
                    <Track />
                </Tracklist>
            </Playlist>
        </Columns>
    </App>
  );
} */