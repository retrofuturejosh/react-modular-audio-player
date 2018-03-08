import PropTypes from 'prop-types';

//shorten PropTypes
let str = PropTypes.string,
  bool = PropTypes.bool,
  requiredFunc = PropTypes.func.isRequired,

  //for more than one component
  rearrangeProps = PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    style: PropTypes.object,
    innerComponents: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf([
        "name",
        "play",
        "rewind",
        "forward",
        "loop",
        "time",
        "seek",
        "volume"
      ]),
      style: PropTypes.object
    }))
  })),
  handleHoverOut = requiredFunc,
  handleHoverOver = requiredFunc,
  playIcon = str,
  playHoverIcon = str,
  pauseIcon = str,
  pauseHoverIcon = str,
  volumeIcon = str,
  volumeEngagedIcon = str,
  muteIcon = str,
  muteEngagedIcon = str,
  forwardIcon = str,
  forwardHoverIcon = str,
  rewindIcon = str,
  rewindHoverIcon = str,
  loopIcon = str,
  loopEngagedIcon = str,
  iconSize = str,
  sliderClass = str,
  playerWidth = str,
  hideSeeking = bool;

export const audioPlayerPropTypes = {
  audioFiles: PropTypes
    .arrayOf(PropTypes.shape({src: str.isRequired, title: str, artist: str}))
    .isRequired,
  playIcon,
  playHoverIcon,
  pauseIcon,
  pauseHoverIcon,
  volumeIcon,
  volumeEngagedIcon,
  muteIcon,
  muteEngagedIcon,
  forwardIcon,
  forwardHoverIcon,
  rewindIcon,
  rewindHoverIcon,
  loopIcon,
  loopEngagedIcon,
  iconSize,
  sliderClass,
  playerWidth,
  hideSeeking,
  fontFamily: str,
  fontSize: str,
  fontColor: str,
  fontWeight: str,
  hideForward: bool,
  hideLoop: bool,
  loopPlaylist: bool,
  hideRewind: bool,
  hideTime: bool,
  hideName: bool,
  rearrange: rearrangeProps
};

export const customArrangePropTypes = {
  order: rearrangeProps,
  setStyle: requiredFunc,
  setAudio: requiredFunc,
  componentObj: PropTypes.shape({
    play: requiredFunc,
    rewind: requiredFunc,
    forward: requiredFunc,
    loop: requiredFunc,
    name: requiredFunc,
    time: requiredFunc,
    volume: requiredFunc
  })
};

export const forwardPropTypes = {
  handleHoverOver,
  handleHoverOut,
  endPlay: requiredFunc,
  forwardHover: bool.isRequired,
  forwardIcon,
  forwardHoverIcon,
  iconSize
};

export const loopPropTypes = {
  handleHoverOver,
  handleHoverOut,
  iconSize,
  handleLoop: requiredFunc,
  loopIcon,
  loopEngagedIcon,
  loopHover: bool.isRequired,
  loop: bool.isRequired
};

export const namePropTypes = {
  hideSeeking,
  setNameDisplayRef: requiredFunc,
  scrollMarquee: bool.isRequired,
  scrollMarqueeFunc: requiredFunc,
  scrollStyle: PropTypes.object,
  artist: str,
  title: str,
  width: str
};

export const playPropTypes = {
  playing: bool.isRequired,
  handlePause: requiredFunc,
  handlePlay: requiredFunc,
  handleHoverOver,
  handleHoverOut,
  iconSize,
  renderPlayIcon: requiredFunc
};

export const rewindPropTypes = {
  handleHoverOut,
  handleHoverOver,
  handleRewind: requiredFunc,
  rewindHover: bool.isRequired,
  rewindHoverIcon,
  rewindIcon,
  iconSize
};

export const seekBarPropTypes = {
  sliderClass,
  seekerVal: str.isRequired,
  handleSeekSlider: requiredFunc,
  handleSeek: requiredFunc,
  width: str.isRequired
};

export const timePropTypes = {
  currentAudioTime: str.isRequired,
  duration: str.isRequired
};

export const volumePropTypes = {
  hideSeeking,
  handleMute: requiredFunc,
  handleHoverOver,
  handleHoverOut,
  iconSize,
  renderMuteIcon: requiredFunc,
  sliderClass: str.isRequired,
  volume: str.isRequired,
  handleVolume: requiredFunc,
  width: str.isRequired
};