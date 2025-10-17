import React from 'react'
import video from '../../assets/video/eye-video.mp4';
function Video() {
  return (
    <div className="md:mx-20">
      <video
        className="shadow-md "
        // controls
        autoPlay
        muted
        loop
        loading="lazy"
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  )
}

export default Video