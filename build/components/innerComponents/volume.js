import React from 'react';

//prop types
import {volumePropTypes} from '../spec/propTypes'

const Volume = (props) => {
  let {
    hideSeeking,
    handleMute,
    handleHoverOver,
    handleHoverOut,
    iconSize,
    renderMuteIcon,
    sliderClass,
    volume,
    handleVolume,
    width
  } = props;

  return (
    <div 
      className="audio-player-volume" 
      style={{
        width
      }}>
      <div
        id="volume"
        onClick={handleMute}
        onMouseOver={e => handleHoverOver(e, 'mute')}
        onMouseOut={e => handleHoverOut(e, 'mute')}>
        <img 
          id="volume-icon"
          style={{
            height: iconSize
          }} 
          src={renderMuteIcon()}/>
      </div>
      <div className="slide-container">
        <input
          className={sliderClass}
          type="range"
          min="0"
          max="100"
          step="1"
          value={volume}
          onChange={handleVolume}/>
      </div>
    </div>
  )
}

Volume.propTypes = volumePropTypes;

export default Volume;