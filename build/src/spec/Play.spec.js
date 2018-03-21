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
    audioPlayer,
    playlist = [
      {
        src: "/music.mp3",
        title: "Song",
        artist: "Singer"
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
      shallowAudioPlayer = shallow(<AudioPlayer audioFiles={playlist} />)
      playSpy = sinon.spy(audioPlayer.instance(), "handlePlay");
      pauseSpy = sinon.spy(audioPlayer.instance(), "handlePause");
      audioPlayer.instance().forceUpdate();
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

    describe("Functions", () => {
      describe("Called When Component Mounts", () => {
        it("mountComponent is called with componentDidMount", () => {
          let instance = shallowAudioPlayer.instance()
          let mountComponentSpy = sinon.spy(instance, 'mountComponent');
          instance.componentDidMount();
          expect(mountComponentSpy.calledOnce).to.equal(true);
        })
        it("setOpts is called with mountComponent", () => {
          let instance = shallowAudioPlayer.instance()
          let setOptsSpy = sinon.spy(instance, 'setOpts');
          instance.mountComponent();
          expect(setOptsSpy.calledOnce).to.equal(true);
        })
        it("setScrollSize is called with mountComponent", () => {
          let instance = shallowAudioPlayer.instance()
          let setScrollSizeSpy = sinon.spy(instance, 'setScrollSize');
          instance.mountComponent();
          expect(setScrollSizeSpy.calledOnce).to.equal(true);
        })
        it("setPercentages is called with mountComponent", () => {
          let instance = shallowAudioPlayer.instance()
          let setPercentagesSpy = sinon.spy(instance, 'setPercentages');
          instance.mountComponent();
          expect(setPercentagesSpy.calledOnce).to.equal(true);
        })
      })

      describe("Play function", () => {
        it("Clicking Play calls handlePlay", () => {
          expect(playSpy.calledOnce).to.equal(false);
          audioPlayer.find("#play").simulate('click');
          expect(playSpy.calledOnce).to.equal(true);
        })
        it("Clicking Play sets state.playing", () => {
          audioPlayer.find("#play").simulate('click');
          expect(audioPlayer.state().playing).to.equal(true);
        })
        it('Clicking play twice calls handlePlay, then handlePause', () => {
          expect(playSpy.calledOnce).to.equal(false);
          audioPlayer.find("#play").simulate('click');
          expect(playSpy.calledOnce).to.equal(true);
          audioPlayer.find("#play").simulate('click');
          expect(pauseSpy.calledOnce).to.equal(true);
        })
      })
    })
  });

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
