export function scrollMarquee(e, direction) {
  if (direction === "left") {
    this.setState({
      scrollStyle: {
        marginLeft: -this.state.scrollDifference,
        transition: `all ${this.state.scrollTime}s ease-in`
      }
    })
  } else {
    this.setState({
      scrollStyle: {
        marginLeft: "0",
        transition: "all 0.3s ease-in"
      }
    })
  }
}

export function renderPlayIcon() {
  if (this.state.playStarted) {
    if (this.state.playHover) {
      //play has started, hovering, playing
      if (this.state.playing) 
        return this.state.pauseHoverIcon;
      else 
        //play has started, hovering, paused
        return this.state.playHoverIcon;
      }
    else {
      //play has started, NOT hovering, playing
      if (this.state.playing) 
        return this.state.pauseIcon;
      else 
        //play has started, NOT hovering, paused
        return this.state.playIcon;
      }
    } else {
    //play has NOT started, hovering
    if (this.state.playHover) 
      return this.state.playHoverIcon; //play has NOT started, NOT hovering
    else 
      return this.state.playIcon;
    }
  }

export function renderMuteIcon() {
  if (this.state.muted) {
    if (this.state.muteHover) {
      //muted, hovering, playing
      if (this.state.playing) 
        return this.state.volumeEngagedIcon;
      else 
        //muted, hovering, paused
        return this.state.volumeIcon
    }
    //muted, NOT hovering, playing
    if (this.state.playing) 
      return this.state.muteEngagedIcon;
    else 
      //muted, NOT hovering, playing
      return this.state.muteIcon;
    }
  else {
    if (this.state.muteHover) {
      //NOT muted, hovering, playing
      if (this.state.playing) 
        return this.state.muteEngagedIcon;
      else 
        //NOT muted, hovering, paused
        return this.state.muteIcon
    } else if (this.state.playing) 
      //NOT muted, NOT hovering, playing;
      return this.state.volumeEngagedIcon
    else 
      //NOT muted, NOT hovering, paused
      return this.state.volumeIcon;
    }
  }