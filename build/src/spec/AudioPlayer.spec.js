import { expect } from "chai";
import React from "react";
import enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from 'sinon'

import { AudioPlayer } from "../audioPlayer";
import initialState from "../initialState";
import Play from "../innerComponents/play";
import Rewind from "../innerComponents/rewind";
import Forward from "../innerComponents/forward";
import Loop from "../innerComponents/loop";
import Name from "../innerComponents/name";
import Time from "../innerComponents/time";
import SeekBar from "../innerComponents/seekBar";
import Volume from "../innerComponents/volume";
import { mountComponent } from "../functions/setUp";
import { handleHoverOut } from "../functions/hover";


const adapter = new Adapter();
enzyme.configure({ adapter });

describe("AudioPlayer Component", () => {

  window.requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
  };
  window.HTMLMediaElement.prototype.pause = () => {  };
  let playSpy,
    pauseSpy,
    shallowAudioPlayer,
    handleHoverOverSpy,
    handleHoverOutSpy,
    handleRewindSpy,
    audioPlayer,
    setScrollSizeSpy,
    newOpts = {
      playerWidth: "10rem",
      playIcon: "/playIcon",
      playHoverIcon: "/playHoverIcon",
      pauseIcon: "/pauseIcon",
      pauseHoverIcon: "/pauseHoverIcon",
      volumeIcon: "/volumeIcon",
      volumeEngagedIcon: "/volumeEngagedIcon",
      muteIcon: "/muteIcon",
      muteEngagedIcon: "/muteEngagedIcon",
      forwardIcon: "/forwardIcon",
      forwardHoverIcon: "/forwardHoverIcon",
      rewindIcon: "/rewindIcon",
      rewindHoverIcon: "/rewindHoverIcon",
      loopIcon: "/loopIcon",
      loopEngagedIcon: "/loopEngagedIcon",
      fontFamily: "serif",
      fontWeight: "bolder",
      fontSize: "2em",
      fontColor: "red",
      sliderClass: "new-slider",
      iconSize: "2em"
    },
    playlist = [
      {
        src: "/music.mp3",
        title: "Name of a Song",
        artist: "Name of an Artist"
      },
      {
        src: "/moreMusic.mp3",
        title: "Another Song",
        artist: "Another Singer"
      }
    ];

  describe("Default AudioPlayer", () => {
    beforeEach(() => {
      audioPlayer = mount(<AudioPlayer audioFiles={playlist} />);
    });

    describe('Inital State', () => {
      it("has correct initial state", () => {
        expect(audioPlayer.state()).to.deep.equal(initialState);
      });
      it("has the correct HTML audio element", () => {
        expect(audioPlayer.find('audio').props().src).to.equal('/music.mp3')
      })
    })

    describe('Views', () => {
      it("renders all the child components", () => {
        checkMultipleComponents(audioPlayer, [Play, Rewind, Forward, Loop, Name, Time, SeekBar, Volume]);
      });
    })
  });

  describe("Functions", () => {
    beforeEach(() => {
      audioPlayer = mount(<AudioPlayer 
        audioFiles={playlist} 
        playIcon="/playIcon"
        playHoverIcon="/playHoverIcon"
        forwardIcon="/forwardIcon"
        forwardHoverIcon="/forwardHoverIcon"
        rewindIcon="/rewindIcon"
        rewindHoverIcon="/rewindHoverIcon"/>);
      setScrollSizeSpy = sinon.spy(audioPlayer.instance(), 'setScrollSize');
      playSpy = sinon.spy(audioPlayer.instance(), "handlePlay");
      pauseSpy = sinon.spy(audioPlayer.instance(), "handlePause");
      handleHoverOverSpy = sinon.spy(audioPlayer.instance(), "handleHoverOver");
      handleHoverOutSpy = sinon.spy(audioPlayer.instance(), "handleHoverOut");
      handleRewindSpy = sinon.spy(audioPlayer.instance(), 'handleRewind');
      audioPlayer.instance().forceUpdate();
    });

    describe("Called When Component Mounts", () => {
      it("mountComponent is called with componentDidMount", () => {
        let instance = audioPlayer.instance()
        let mountComponentSpy = sinon.spy(instance, 'mountComponent');
        instance.componentDidMount();
        expect(mountComponentSpy.calledOnce).to.equal(true);
      })
      it("setOpts is called with mountComponent", () => {
        let instance = audioPlayer.instance()
        let setOptsSpy = sinon.spy(instance, 'setOpts');
        instance.mountComponent();
        expect(setOptsSpy.calledOnce).to.equal(true);
      })
      it("setOpts properly updates state", () => {
        let prevState = audioPlayer.state();
        audioPlayer.setProps(newOpts);
        audioPlayer.instance().componentDidMount();
        let newState = audioPlayer.state();
        expect(newState).to.not.deep.equal(prevState);
        for (let key in newOpts) {
          expect(newState[key] === newOpts[key]);
        }
      })
      it("setScrollSize is called with mountComponent", () => {
        let instance = audioPlayer.instance()
        instance.mountComponent();
        expect(setScrollSizeSpy.calledOnce).to.equal(true);
      })
      it("setPercentages is called with mountComponent", () => {
        let instance = audioPlayer.instance()
        let setPercentagesSpy = sinon.spy(instance, 'setPercentages');
        instance.mountComponent();
        expect(setPercentagesSpy.calledOnce).to.equal(true);
      })
      it("setStyle returns correct style", () => {
        audioPlayer.setProps(newOpts);
        audioPlayer.instance().componentDidMount();
        audioPlayer.update();
        let style = audioPlayer.find(".audio-player").props().style
        for (let key in style) {
          if (key === 'color') {
            expect(style[key]).to.equal(newOpts['fontColor'])
          } else if (key === 'width'){
            expect(style[key]).to.equal(newOpts['playerWidth'])
          } else {
          expect(style[key]).to.equal(newOpts[key]);
          }
        }
      })
      it("setAudio is called when component renders", () => {
        let instance = audioPlayer.instance()
        let setAudioSpy = sinon.spy(instance, 'setAudio');
        instance.render()
        expect(setAudioSpy.calledOnce).to.equal(true);
      })
    })

    describe("Play/Pause functions", () => {
      it("Clicking #play div calls handlePlay", () => {
        expect(playSpy.calledOnce).to.equal(false);
        click(audioPlayer.find("#play"));
        expect(playSpy.calledOnce).to.equal(true);
      })
      it("Clicking #play div sets state.playing", () => {
        click(audioPlayer.find("#play"));
        expect(audioPlayer.state().playing).to.equal(true);
      })
      it("Clicking #play div twice calls handlePlay then handlePause", () => {
        let playDiv = audioPlayer.find("#play");
        expect(playSpy.calledOnce).to.equal(false);
        click(playDiv);
        expect(playSpy.calledOnce).to.equal(true);
        click(playDiv);
        expect(pauseSpy.calledOnce).to.equal(true);
      })
      it("Clicking #play a third time calles handlePlay twice", () => {
        let playDiv = audioPlayer.find("#play");
        expect(playSpy.calledOnce).to.equal(false);
        click(playDiv);
        expect(playSpy.calledOnce).to.equal(true);
        click(playDiv);
        expect(pauseSpy.calledOnce).to.equal(true);
        click(playDiv);
        expect(playSpy.callCount).to.equal(2);
      })
      it("mouseOver #play calls handleHoverOver with 'play' as second argument and sets state.playHover as true", () => {
        mouseOverCheck(audioPlayer, "playHover", handleHoverOverSpy, '#play')
      })
      it("mouseLeave #play calls handleHoverOut with 'play' as second argument and sets state.playHover as false", () => {
        mouseLeaveCheck(audioPlayer, "playHover", handleHoverOutSpy, "#play");
      })
      it("mouseOver #play changes #play img src", () => {
        mouseOverSrcCheck(audioPlayer, "#play", "/playIcon", "/playHoverIcon");
      })
      it("mouseLeave #play changes #play img src", () => {
        mouseLeaveSrcCheck(audioPlayer, "#play", "/playIcon", "/playHoverIcon");
      })
    })

    describe("Rewind Functions", () => {
      it("mouseOver #rewind calls handleHoverOver with 'rewind' as second argument and sets state.rewindHover as true", () => {
        mouseOverCheck(audioPlayer, "rewindHover", handleHoverOverSpy, "#rewind")
      })
      it("mouseLeave #rewind calls handleHoverOut with 'rewind' as second argument and sets state.rewindHover as false", () => {
        mouseLeaveCheck(audioPlayer, "rewindHover", handleHoverOutSpy, "#rewind");
      })
      it("mouseOver #rewind changes #rewind img src", () => {
        mouseOverSrcCheck(audioPlayer, "#rewind", "/rewindIcon", "/rewindHoverIcon");
      })
      it("mouseLeave #rewind changes #rewind img src", () => {
        mouseLeaveSrcCheck(audioPlayer, "#rewind", "/rewindIcon", "/rewindHoverIcon");
      })
      it("clicking #rewind div once when current audio time is 0 calls handleRewind & setScrollSize, sets state.recentlyRewound, changes state.currentTrackIdx", () => {
        let prevTrackIdx = audioPlayer.state().currentTrackIdx;
        click(audioPlayer.find("#rewind"));
        expect(handleRewindSpy.calledOnce).to.equal(true);
        expect(audioPlayer.state().recentlyRewound).to.equal(true);
        expect(audioPlayer.state().currentTrackIdx).to.not.equal(prevTrackIdx);
        expect(setScrollSizeSpy.calledOnce).to.equal(true);
      })
      it("after clicking #rewind div, state.recentlyRewound is set back to false after 1200 ms", () => {
        expect(audioPlayer.state().recentlyRewound).to.equal(false);
        click(audioPlayer.find("#rewind"));
        expect(audioPlayer.state().recentlyRewound).to.equal(true);
        setTimeout(() => {
          expect(audioPlayer.state().recentlyRewound).to.equal(false)
        }, 1500)
      })
      it("clicking #rewind div when audio's current time is greater than 0 rewinds to beginning of current track and properly sets state", () => {
        let prevTrackIdx = audioPlayer.state().currentTrackIdx;
        audioPlayer.setState({currentAudioTime: "1:00", seekerVal: "50"})
        let oldTime = audioPlayer.state().currentAudioTime;
        let oldSeekerVal = audioPlayer.state().seekerVal;
        audioPlayer.instance().audioRef.currentTime = 1000;
        click(audioPlayer.find("#rewind"));
        expect(audioPlayer.state().currentTrackIdx).to.equal(prevTrackIdx);
        expect(audioPlayer.instance().audioRef.currentTime).to.equal(0);
        expect(audioPlayer.state().currentAudioTime).to.not.equal(oldTime);
        expect(audioPlayer.state().seekerVal).to.not.equal(oldSeekerVal);
      })
      it("clicking #rewind div twice when audio's current time is greater than 0 calls handleRewind & setScrollSize, sets state.recentlyRewound, changes state.currentTrackIdx", () => {
        let prevTrackIdx = audioPlayer.state().currentTrackIdx;
        audioPlayer.setState({currentAudioTime: "1:00", seekerVal: "50"})
        let oldTime = audioPlayer.state().currentAudioTime;
        let oldSeekerVal = audioPlayer.state().seekerVal;
        audioPlayer.instance().audioRef.currentTime = 1000;
        click(audioPlayer.find("#rewind"));
        click(audioPlayer.find("#rewind"));
        expect(audioPlayer.state().currentTrackIdx).to.not.equal(prevTrackIdx);
        expect(audioPlayer.instance().audioRef.currentTime).to.equal(0);
        expect(audioPlayer.state().currentAudioTime).to.equal("0:00");
        expect(audioPlayer.state().currentAudioTime).to.not.equal(oldTime);
        expect(audioPlayer.state().seekerVal).to.equal("0");
        expect(audioPlayer.state().recentlyRewound).to.equal(true);
        expect(audioPlayer.state().seekerVal).to.not.equal(oldSeekerVal);
        expect(setScrollSizeSpy.calledOnce).to.equal(true);
        expect(handleRewindSpy.callCount).to.equal(2);
      })
      it("clicking #rewind div, when playing, calls handlePlay", () => {
        click(audioPlayer.find("#rewind"));
        audioPlayer.setState({playing: true});
        expect(playSpy.calledOnce).to.equal(true);
      })
    })

    describe("Forward Functions", () => {
      it("mouseOver #forward calls handleHoverOver with 'forward' as second argument and sets state.forwardHover as true", () => {
        mouseOverCheck(audioPlayer, "forwardHover", handleHoverOverSpy, "#forward")
      })
      it("mouseLeave #forward calls handleHoverOut with 'forward' as second argument and sets state.forwardHover as false", () => {
        mouseLeaveCheck(audioPlayer, "forwardHover", handleHoverOutSpy, "#forward");
      })
      it("mouseOver #forward changes #forward img src", () => {
        mouseOverSrcCheck(audioPlayer, "#forward", "/forwardIcon", "/forwardHoverIcon");
      })
      it("mouseLeave #forward changes #forward img src", () => {
        mouseLeaveSrcCheck(audioPlayer, "#forward", "/forwardIcon", "/forwardHoverIcon");
      })
    })
  })

  describe("Rearranged Player", () => {
    let rearrangeTestOne = [
      {
        className: "One",
        innerComponents: [{ type: "name" }]
      },
      {
        className: "Two",
        innerComponents: [
          { type: "play" },
          { type: "rewind" },
          { type: "forward" },
          { type: "loop" }
        ]
      },
      {
        className: "Three",
        innerComponents: [{ type: "time" }, { type: "seek" }]
      },
      {
        className: "Four",
        innerComponents: [{ type: "volume" }]
      }
    ];

    beforeEach(() => {
      audioPlayer = mount(
        <AudioPlayer audioFiles={playlist} rearrange={rearrangeTestOne} />
      );
      audioPlayer.setProps(newOpts)
    });

    it("has correct initial state", () => {
      let rearrangeInitialState = Object.assign({}, initialState);
      rearrangeInitialState.nameWidth = "100%";
      rearrangeInitialState.seekWidth = "100%";
      rearrangeInitialState.volumeWidth = "100%";
      expect(audioPlayer.state()).to.deep.equal(rearrangeInitialState);
    });
    it("renders the correct subcomponents", () => {
      checkMultipleComponents(audioPlayer, [Name, Play, Rewind, Forward,Loop, Time, SeekBar, Volume]);
    });
  });
});

function click(div) {
  div.simulate('click');
}

function checkComponents(wrapper, component) {
  expect(wrapper.find(component)).to.have.length(1);
}

function checkMultipleComponents(wrapper, componentArr) {
  componentArr.forEach(component => {
    checkComponents(wrapper, component);
  })
}

function mouseOverCheck(wrapper, hoverKey, spy, div) {
  {
    expect(wrapper.state()[hoverKey]).to.equal(false);
    wrapper.find(div).simulate('mouseOver');
    expect(spy.calledOnce).to.equal(true);
    expect(wrapper.state()[hoverKey]).to.equal(true);
    expect(spy.args[0][1]).to.equal(div.slice(1));
  }
}

function mouseLeaveCheck(wrapper, hoverKey, spy, div) {
  {
    expect(wrapper.state()[hoverKey]).to.equal(false);
    wrapper.find(div).simulate('mouseOver');
    expect(wrapper.state()[hoverKey]).to.equal(true);
    wrapper.find(div).simulate('mouseLeave');
    expect(spy.calledOnce).to.equal(true);
    expect(wrapper.state()[hoverKey]).to.equal(false);
    expect(spy.args[0][1]).to.equal(div.slice(1))
  }
}

function mouseOverSrcCheck(wrapper, div, srcOne, srcTwo){
  {
    expect(wrapper.find(div).children().props().src).to.equal(srcOne);
    wrapper.find(div).simulate('mouseOver');
    expect(wrapper.find(div).children().props().src).to.equal(srcTwo);
  }
}

function mouseLeaveSrcCheck(wrapper, div, srcOne, srcTwo) {
  {
    expect(wrapper.find(div).children().props().src).to.equal(srcOne);
    wrapper.find(div).simulate('mouseOver');
    expect(wrapper.find(div).children().props().src).to.equal(srcTwo);
    wrapper.find(div).simulate('mouseLeave');
    expect(wrapper.find(div).children().props().src).to.equal(srcOne);
  }
}