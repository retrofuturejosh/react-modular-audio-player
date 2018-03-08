import React from 'react';

//prop types
import {namePropTypes} from '../spec/propTypes'

const Name = (props) => {
  let {
    hideSeeking,
    setNameDisplayRef,
    scrollMarquee,
    scrollMarqueeFunc,
    scrollStyle,
    artist,
    title,
    width
  } = props;

  return (
    <div
      className="audio-player-track-name"
      style={{
        width
      }}
      ref={setNameDisplayRef}
      onMouseOver={scrollMarquee
      ? e => scrollMarqueeFunc(e, 'left')
      : null}
      onMouseOut={scrollMarquee
      ? e => scrollMarqueeFunc(e, 'right')
      : null}>
      <div className="marquee" style={scrollStyle}>
        {artist
          ? (`${artist} - `)
          : null
        }
        {title}
      </div>
    </div>
  )
}

Name.propTypes = namePropTypes;

export default Name;