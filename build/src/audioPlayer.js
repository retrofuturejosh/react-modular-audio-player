import React, { Component } from "react";

//Functions that render dumb components
import {
  renderPlay,
  renderRewind,
  renderForward,
  renderLoop,
  renderName,
  renderSeekBar,
  renderTime,
  renderVolume,
  renderCustomArrange
} from "./innerComponents/index";

//methods
import functions from "./functions/index";

//initial state
import { default as initialState } from "./initialState";

//style sheet
import "./audioPlayerStyle.scss";

//prop types
import { audioPlayerPropTypes } from "./spec/propTypes";

export class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.rewindTimeout = null;
    this.seekingInterval = null;
    this.nameDisplay = null;

    //reference object for rendering inner components
    this.componentObj = {
      play: renderPlay.bind(this),
      rewind: renderRewind.bind(this),
      forward: renderForward.bind(this),
      loop: renderLoop.bind(this),
      name: renderName.bind(this),
      seek: renderSeekBar.bind(this),
      time: renderTime.bind(this),
      volume: renderVolume.bind(this)
    };

    //binding methods
    this.mountComponent = functions.mountComponent.bind(this);
    this.setScrollSize = functions.setScrollSize.bind(this);
    this.setNameDisplayRef = functions.setNameDisplayRef.bind(this);
    this.setOpts = functions.setOpts.bind(this);
    this.setStyle = functions.setStyle.bind(this);
    this.setAudio = functions.setAudio.bind(this);
    this.setPercentages = functions.setPercentages.bind(this);
    this.startPlay = functions.startPlay.bind(this);
    this.endPlay = functions.endPlay.bind(this);
    this.handlePlay = functions.handlePlay.bind(this);
    this.handlePause = functions.handlePause.bind(this);
    this.handleProgress = functions.handleProgress.bind(this);
    this.handleSeekSlider = functions.handleSeekSlider.bind(this);
    this.handleSeek = functions.handleSeek.bind(this);
    this.setTime = functions.setTime.bind(this);
    this.secondsToClock = functions.secondsToClock.bind(this);
    this.loadDuration = functions.loadDuration.bind(this);
    this.handleVolume = functions.handleVolume.bind(this);
    this.handleMute = functions.handleMute.bind(this);
    this.handleRewind = functions.handleRewind.bind(this);
    this.handleHoverOver = functions.handleHoverOver.bind(this);
    this.handleHoverOut = functions.handleHoverOut.bind(this);
    this.scrollMarquee = functions.scrollMarquee.bind(this);
    this.renderPlayIcon = functions.renderPlayIcon.bind(this);
    this.renderMuteIcon = functions.renderMuteIcon.bind(this);
    this.handleLoop = functions.handleLoop.bind(this);
    this.renderCustomArrange = renderCustomArrange.bind(this);
  }

  componentDidMount() {
    this.mountComponent();
  }

  render() {
    let title = this.props.audioFiles[this.state.currentTrackIdx].title;

    if (!this.props.rearrange) {
      //DEFAULT PLAYER VIEW
      return (
        <div
          className="audio-player"
          style={this.setStyle()}
        >
          {this.setAudio()}

          {/* Main Controls */}
          {/* Play/Pause */}
          {this.componentObj.play("first")}

          {/* Rewind */}
          {this.props.hideRewind ? null : this.componentObj.rewind()}

          {/* Forward */}
          {this.props.hideForward ? null : this.componentObj.forward()}

          {/* Loop */}
          {this.props.hideLoop ? null : this.componentObj.loop()}

          {/* Track Name and Artist */}
          {this.props.hideName ? null : this.componentObj.name()}

          {/* Seeking Bar*/}
          {this.props.hideSeeking ? null : this.componentObj.seek()}

          {/* Current Time / Duration */}
          {this.props.hideTime ? null : this.componentObj.time()}

          {/* Volume Controls */}
          {this.componentObj.volume()}
        </div>
      );
    } else {
      //Custom Arrangement
      return this.renderCustomArrange();
    }
  }
}

AudioPlayer.propTypes = audioPlayerPropTypes;
