import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AudioPlayer} from '../audioPlayer';

const adapter = new Adapter()
enzyme.configure({adapter})

describe('audioPlayer', () => {
  window.requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
  };
  let audioPlayer,
    playlist = [
    { src: "/music.mp3",
      title: "Song",
      artist: "Singer" },
    { src: "/moreMusic.mp3",
      title: "Another Song",
      artist: "Another Singer" }
  ];

  beforeEach(() => {
    audioPlayer = shallow(<AudioPlayer audioFiles={playlist}/>)
  })

  it('has correct initial state', () => {
    console.log(audioPlayer.state());
  })
})
