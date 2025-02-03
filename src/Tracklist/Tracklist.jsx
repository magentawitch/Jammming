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

