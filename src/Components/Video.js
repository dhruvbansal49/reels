import React from 'react'
import './Video.css'
import ReactDOM from 'react-dom';
function Video(props) {
    const handleMute = (e) => {
        e.preventDefault(); // this done to avoid clicking on video to play and pause it
        e.target.muted = !e.target.muted
    }
    const handleAutoScroll = (e) => { // This function is executed, when a video is finished and playing and we
        // move on to play next video
        // Used findDOMNode in order to find React-DOM element
        let next_video = ReactDOM.findDOMNode(e.target).parentNode.nextSibling; // moving to next video
        if (next_video!=null) {
            console.log(next_video);
            next_video.scrollIntoView({ behaviour: "smooth" });
            e.target.muted = true; // muting the current video
        }

    }
    return (
        <>

            <video  onEnded={handleAutoScroll}   src={props.source} className="video-styles1" onClick={handleMute}
                controls muted='muted' type='video/mp4'></video>
        </>
    )
}

export default Video