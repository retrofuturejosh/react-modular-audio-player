export function handleRewind() {
  let currentTime = this.audioRef.currentTime;
  let prevTrackIdx = (this.state.currentTrackIdx === 0)
    ? this.props.audioFiles.length - 1
    : this.state.currentTrackIdx - 1;

  if (this.state.recentlyRewound || !currentTime) {
    clearTimeout(this.rewindTimeout);
    clearInterval(this.seekingInterval);
    this.setState({
      currentAudioTime: "0:00",
      seekerVal: "0",
      currentTrackIdx: prevTrackIdx,
      scrollMarquee: false,
      scrollDifference: 0,
      scrollStyle: {
        marginLeft: "0"
      }
    }, () => {
      if (this.state.playing)
        this.audioRef.currentTime = 0;
        this.handlePlay();
      this.setScrollSize();
    });
  } else if (currentTime) {
    this.audioRef.currentTime = 0;
    if (!this.state.playing) {
      this.setState({currentAudioTime: "0:00", seekerVal: "0"});
    }
  }
  this.setState({recentlyRewound: true});
  this.rewindTimeout = setTimeout(() => {
    this.setState({recentlyRewound: false});
  }, 1200);
}