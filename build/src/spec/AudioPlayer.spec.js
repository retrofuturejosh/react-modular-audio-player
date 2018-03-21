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
    audioPlayer,
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
      it("renders Play component", () => {
        expect(audioPlayer.find(Play)).to.have.lengthOf(1);
      });
      it("renders a Rewind component", () => {
        expect(audioPlayer.find(Rewind)).to.have.length(1);
      });
      it("renders a Forward component", () => {
        expect(audioPlayer.find(Forward)).to.have.length(1);
      });
      it("renders a Loop component", () => {
        expect(audioPlayer.find(Loop)).to.have.length(1);
      });
      it("renders a Name component", () => {
        expect(audioPlayer.find(Name)).to.have.length(1);
      });
      it("renders a Time component", () => {
        expect(audioPlayer.find(Time)).to.have.length(1);
      });
      it("renders a SeekBar component", () => {
        expect(audioPlayer.find(SeekBar)).to.have.length(1);
      });
      it("renders a Volume component", () => {
        expect(audioPlayer.find(Volume)).to.have.length(1);
      });
    })
  });

  describe("Functions", () => {
    beforeEach(() => {
      audioPlayer = mount(<AudioPlayer 
        audioFiles={playlist} 
        playIcon="/playIcon"
        playHoverIcon="/playHoverIcon"/>);
      playSpy = sinon.spy(audioPlayer.instance(), "handlePlay");
      pauseSpy = sinon.spy(audioPlayer.instance(), "handlePause");
      handleHoverOverSpy = sinon.spy(audioPlayer.instance(), "handleHoverOver");
      handleHoverOutSpy = sinon.spy(audioPlayer.instance(), "handleHoverOut");
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
        let setScrollSizeSpy = sinon.spy(instance, 'setScrollSize');
        instance.nameDisplay = {};
        instance.nameDisplay.scrollWidth = 150;
        instance.nameDisplay.offSetWidth = 100;
        instance.mountComponent();
        expect(setScrollSizeSpy.calledOnce).to.equal(true);
      })
      it("setPercentages is called with mountComponent", () => {
        let instance = audioPlayer.instance()
        let setPercentagesSpy = sinon.spy(instance, 'setPercentages');
        instance.mountComponent();
        expect(setPercentagesSpy.calledOnce).to.equal(true);
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
        audioPlayer.find("#play").simulate('click');
        expect(playSpy.calledOnce).to.equal(true);
      })
      it("Clicking #play div sets state.playing", () => {
        audioPlayer.find("#play").simulate('click');
        expect(audioPlayer.state().playing).to.equal(true);
      })
      it('Clicking #play div twice calls handlePlay then handlePause', () => {
        expect(playSpy.calledOnce).to.equal(false);
        audioPlayer.find("#play").simulate('click');
        expect(playSpy.calledOnce).to.equal(true);
        audioPlayer.find("#play").simulate('click');
        expect(pauseSpy.calledOnce).to.equal(true);
      })
      it('Clicking #play a third time calles handlePlay twice', () => {
        expect(playSpy.calledOnce).to.equal(false);
        audioPlayer.find("#play").simulate('click');
        expect(playSpy.calledOnce).to.equal(true);
        audioPlayer.find("#play").simulate('click');
        expect(pauseSpy.calledOnce).to.equal(true);
        audioPlayer.find("#play").simulate('click');
        expect(playSpy.callCount).to.equal(2);
      })
      it('mouseOver #play calls handleHoverOver with "play" as second argument and sets state.playHover as true', () => {
        expect(audioPlayer.state().playHover).to.equal(false);
        audioPlayer.find("#play").simulate('mouseOver');
        expect(handleHoverOverSpy.calledOnce).to.equal(true);
        expect(audioPlayer.state().playHover).to.equal(true);
        expect(handleHoverOverSpy.args[0][1]).to.equal('play')
      })
      it('mouseLeave #play calls handleHoverOut with "play" as second argument and sets state.playHover as false', () => {
        expect(audioPlayer.state().playHover).to.equal(false);
        audioPlayer.find("#play").simulate('mouseOver');
        expect(audioPlayer.state().playHover).to.equal(true);
        audioPlayer.find("#play").simulate('mouseLeave');
        expect(handleHoverOutSpy.calledOnce).to.equal(true);
        expect(audioPlayer.state().playHover).to.equal(false);
        expect(handleHoverOutSpy.args[0][1]).to.equal('play')
      })
      it('mouseOver #play changes #play img src', () => {
        expect(audioPlayer.find("#play").children().props().src).to.equal("/playIcon");
        audioPlayer.find("#play").simulate('mouseOver');
        expect(audioPlayer.find("#play").children().props().src).to.equal("/playHoverIcon");
      })
      it('mouseLeave #play changes #play img src', () => {
        expect(audioPlayer.find("#play").children().props().src).to.equal("/playIcon");
        audioPlayer.find("#play").simulate('mouseOver');
        expect(audioPlayer.find("#play").children().props().src).to.equal("/playHoverIcon");
        audioPlayer.find("#play").simulate('mouseLeave');
        expect(audioPlayer.find("#play").children().props().src).to.equal("/playIcon");
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
      expect(audioPlayer.find(Name)).to.have.length(1);
      expect(audioPlayer.find(Play)).to.have.length(1);
      expect(audioPlayer.find(Rewind)).to.have.length(1);
      expect(audioPlayer.find(Forward)).to.have.length(1);
      expect(audioPlayer.find(Loop)).to.have.length(1);
      expect(audioPlayer.find(Time)).to.have.length(1);
      expect(audioPlayer.find(SeekBar)).to.have.length(1);
      expect(audioPlayer.find(Volume)).to.have.length(1);
    });
  });
});
