import React, { Component } from 'react';
import { connect } from 'react-redux';
import Util from '../../config/util';
import './index.less';
class Header extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { currentMusicItem } = this.props.musicStatus;
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    });
    Util.playMusic(currentMusicItem);
  }
  render() {
    return (
        <div className="music-header row">
          <img src="./static/images/logo.png" width={40} className="music-icon" alt=""/>
          <h1 className="header-text -col-auto">React Music Player</h1>
        </div>
    );
  }
}
function select(state) {
  return {
    visibleTodos: state.musicList,
    musicStatus: state.musicStatus
  }
}
const HeaderConnet = connect(select)(Header);
export default HeaderConnet;