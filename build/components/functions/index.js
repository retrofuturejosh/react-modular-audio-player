import {
  setScrollSize,
  mountComponent,
  setNameDisplayRef,
  setOpts,
  setStyle,
  setAudio,
  setPercentages
} from './setUp';

import {startPlay, endPlay, handlePlay, handlePause} from './playPause';

import {handleProgress, handleSeek, handleSeekSlider} from './seek';

import {setTime, secondsToClock, loadDuration} from './time';

import {handleVolume, handleMute} from './volume';

import {handleRewind} from './rewind';

import {handleHoverOver, handleHoverOut} from './hover';

import {renderPlayIcon, renderMuteIcon, scrollMarquee} from './renderVisualElements';

import {handleLoop} from './loop';

export default {
  setScrollSize,
  mountComponent,
  setNameDisplayRef,
  setOpts,
  setStyle,
  setAudio,
  setPercentages,
  startPlay,
  endPlay,
  handlePlay,
  handlePause,
  handleProgress,
  handleSeek,
  handleSeekSlider,
  setTime,
  secondsToClock,
  loadDuration,
  handleVolume,
  handleMute,
  handleRewind,
  handleHoverOver,
  handleHoverOut,
  renderPlayIcon,
  renderMuteIcon,
  scrollMarquee,
  handleLoop
};