import React from 'react';

//prop types
import {forwardPropTypes} from '../spec/propTypes'

const Forward = (props) => {
  let {
    handleHoverOver,
    handleHoverOut,
    iconSize,
    endPlay,
    forwardHover,
    forwardIcon,
    forwardHoverIcon
  } = props;

  return (
    <div
      id="forward"
      onMouseOver={e => handleHoverOver(e, 'forward')}
      onMouseLeave={e => handleHoverOut(e, 'forward')}
      onClick={e => endPlay(e, true)}>
      <img
        id="forward-icon"
        src={forwardHover
        ? forwardHoverIcon
        : forwardIcon}
        style={{
        height: iconSize
      }}/>
    </div>
  )
}

Forward.propTypes = forwardPropTypes;

export default Forward;