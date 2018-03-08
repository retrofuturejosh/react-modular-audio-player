import React from 'react';

//prop types
import {timePropTypes} from '../spec/propTypes'

const Time = (props) => {
  let {currentAudioTime, duration} = props;

  return (
    <div className="audio-player-time">
      {`${currentAudioTime}/${duration}`}
    </div>
  )
}

Time.propTypes = timePropTypes;

export default Time;