export function handleProgress() {
  if (this.seekingInterval) {
    clearInterval(this.seekingInterval);
  }
  if (this.audioRef) {
    this.seekingInterval = setInterval(() => {
      if (this.audioRef) {
        this.setTime();
        const currentAudioTime =
          this.audioRef.currentTime / this.audioRef.duration * 100;
        this.setState({
          seekerVal: currentAudioTime.toString()
        });
      }
    }, 500);
  }
}

export function handleSeekSlider(event) {
  let seekTo = this.audioRef.duration * (event.target.value / 100);
  clearInterval(this.seekingInterval);
  this.setTime(seekTo);
  this.setState({
    seekerVal: event.target.value.toString()
  });
}

export function handleSeek(event) {
  let seekTo = this.audioRef.duration * (event.target.value / 100);
  this.audioRef.currentTime = seekTo;
  if (this.state.playing) {
    this.handleProgress();
  }
}
