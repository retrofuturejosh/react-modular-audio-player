export function setTime(seekTo) {
  if (this.audioRef){
  let time;
  if (seekTo || seekTo === 0) {
    time = seekTo;
  } else {
    time = this.audioRef.currentTime;
  }
  let currentAudioTime = this.secondsToClock(time);
  this.setState({currentAudioTime});    
  }
}

export function secondsToClock(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return `${minutes}:${seconds}`;
}

export function loadDuration() {
  let duration = this.secondsToClock(this.audioRef.duration);
  this.setState({duration})
}