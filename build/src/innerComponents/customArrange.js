import React from 'react';

//prop types
import {customArrangePropTypes} from '../spec/propTypes'

const CustomArrange = (props) => {
  let {order, setStyle, setAudio, componentObj} = props,
    componentCheck = {},
    defaultTierStyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "left",
      alignContent: "left",
      width: "100%"
    },
    defaultInnerComponentStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
      width: "100%"
    };

  //function to edit default style
  let appendStyle = (originalStyle, additions) => {
    let newStyle = Object.assign({}, originalStyle)
    if (additions) {
      Object
        .keys(additions)
        .forEach(styleElement => {
          newStyle[styleElement] = additions[styleElement]
        })
    }
    return newStyle;
  }

  return (
    <div className="audio-player" style={setStyle(true)}>
      {setAudio()}
      {order.map((tier, idx) => {
        let tierStyle = appendStyle(defaultTierStyle, tier.style)
        return (
          <div className={tier.className} style={tierStyle} key={`level${idx}`}>
            {tier
              .innerComponents
              .map((innerComponent, idx) => {
                let type = innerComponent.type,
                  currentStyle = appendStyle(defaultInnerComponentStyle, innerComponent.style)
                if (componentCheck[type]) 
                  return null
                componentCheck[type] = true;
                return (
                  <div key={`innerComponent${idx}`} style={currentStyle}>
                    {componentObj[type]()}
                  </div>
                )
              })}
            </div>
          )
        })
      }
    </div>
  )
}

CustomArrange.propTypes = customArrangePropTypes;

export default CustomArrange;