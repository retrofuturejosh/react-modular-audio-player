import React from 'react';

//prop types
import {rewindPropTypes} from '../spec/propTypes'

const Rewind = (props) => {
  let {
    handleHoverOver,
    handleHoverOut,
    handleRewind,
    rewindHover,
    rewindHoverIcon,
    rewindIcon,
    iconSize
  } = props;

  return (
    <div
      id="rewind"
      onMouseOver={e => handleHoverOver(e, 'rewind')}
      onMouseLeave={e => handleHoverOut(e, 'rewind')}
      onClick={handleRewind}>
      <img
        id="rewind-icon"
        src={rewindHover
        ? rewindHoverIcon
        : rewindIcon}
        style={{
        height: iconSize
      }}/>
    </div>
  )
}

Rewind.propTypes = rewindPropTypes;

export default Rewind;