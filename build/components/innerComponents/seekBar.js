import React from 'react';

//prop types
import {seekBarPropTypes} from '../spec/propTypes'

const SeekBar = (props) => {
  let {sliderClass, seekerVal, handleSeekSlider, handleSeek, width} = props;

  return (
    <div 
      className="audio-player-seeker" 
      style={{
        width
      }}>
      <div className="slide-container">
        <input
          className={sliderClass}
          type="range"
          min="0"
          max="100"
          step="1"
          value={seekerVal}
          onChange={handleSeekSlider}
          onMouseUp={handleSeek}/>
      </div>
    </div>
  )
}

SeekBar.propTypes = seekBarPropTypes;

export default SeekBar;