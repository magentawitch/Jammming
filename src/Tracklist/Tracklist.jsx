import React from "react";
import Track from "../Track/Track";

function Tracklist(props) {

    return (
        <div>
            {props.trackArray.map((track, i) => 
                <Track 
                    key={i}
                    icon={props.icon}
                    track={track}
                    onTrackClick={() => {props.onTrackClick(track, i); }}
                />
            )}
        </div>
    )
}

export default Tracklist;




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