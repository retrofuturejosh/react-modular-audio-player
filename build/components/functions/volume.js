export function handleVolume(event, muting) {
  //when handleVolume is called from range onChange
  if (event) {
    //for pure volume sliding
    let newVolume = (event.target.value < 1)
      ? 0
      : event.target.value
    this.setState({volume: newVolume});
    this.audioRef.volume = newVolume / 100;

    //set state.mute to true if sliding to less than 1
    if (newVolume < 1) {
      this.setState({muted: true});
    } else if (this.state.muted) {
      //set state.mute to false if sliding up input from  mute
      this.setState({muted: false})
    }
    //when calling function from handleMute()
  } else if (muting) {
    //when muting, move volume slider to 0 and set volume to 0
    this.setState({volumePreMute: this.state.volume, volume: "0"})
    this.audioRef.volume = 0;
  } else {
    //when unmuting, return volume and slider to previous position before mute
    this.setState({volume: this.state.volumePreMute})
    this.audioRef.volume = this.state.volumePreMute / 100;
  }
}

export function handleMute(event) {
  if (!this.state.muted) {
    this.handleVolume(null, true);
  } else {
    this.handleVolume(null, false);
  }
  this.setState({
    muted: !this.state.muted
  });
}