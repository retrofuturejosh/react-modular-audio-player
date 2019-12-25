export function startPlay() {
  if (!this.state.playStarted) {
    this.setState({playStarted: true})
  }
}

export function endPlay(e, skipped) {
  clearInterval(this.seekingInterval);
  let endOfTracks = (this.state.currentTrackIdx === this.props.audioFiles.length - 1)
    ? true
    : false;
  let nextTrackIdx = endOfTracks
    ? 0
    : this.state.currentTrackIdx + 1;
  if (this.state.loop) {
    nextTrackIdx = this.state.currentTrackIdx;
    endOfTracks = false;
  }
  this.setState({
    currentAudioTime: "0:00",
    seekerVal: "0",
    currentTrackIdx: nextTrackIdx,
    scrollMarquee: false,
    scrollDifference: 0,
    scrollStyle: {
      marginLeft: "0"
    }
  }, () => {
    if (endOfTracks && !skipped && !this.props.loopPlaylist) {
      this.setState({playHover: false, playing: false})
    } else {
      if (this.state.loop || skipped)
        this.audioRef.currentTime = 0;
      if (this.state.playing)
        this.handlePlay();
      }
    this.setScrollSize();
  });
}

export function handlePlay(tryCount = 0) {
  if (this.audioRef.readyState < 3 && tryCount <=4) {
    if (!this.state.playing) this.setState({playing: true, paused: false})
    setTimeout(() => {
      this.handlePlay(tryCount + 1)
    }, 500)
  } else {
  let playPromise = this
    .audioRef
    .play();
  if (playPromise != undefined) {
    playPromise.then(success => {
    }).catch(err => {
      console.log('Error playing! \n\n', err);
    })
  }
  this.setState({playing: true, paused: false});
  this.handleProgress();
  }
}

export function handlePause() {
  if (this.state.playing) {
    clearInterval(this.seekingInterval);
    this
      .audioRef
      .pause();
    this.setState({playing: false, paused: true});
  }
}
