export function handleHoverOver(e, type) {
  switch (type) {
    case 'play':
      this.setState({playHover: true});
      break;
    case 'mute':
      this.setState({muteHover: true});
      break;
    case 'forward':
      this.setState({forwardHover: true});
      break;
    case 'rewind':
      this.setState({rewindHover: true});
      break;
    case 'loop':
      this.setState({loopHover: true});
      break;
  }
}

export function handleHoverOut(e, type) {
  switch (type) {
    case 'play':
      this.setState({playHover: false});
      break;
    case 'mute':
      this.setState({muteHover: false});
      break;
    case 'forward':
      this.setState({forwardHover: false});
      break;
    case 'rewind':
      this.setState({rewindHover: false});
      break;
    case 'loop':
      this.setState({loopHover: false});
      break;
  }
}