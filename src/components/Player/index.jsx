import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Progress from '../Progress/index';
import Util from '../../config/util';
import './index.less';
import { changeMusicStatus, playMusic, switchSong } from '../../actions';


let duration = null;
const PLAYERDOM = '#player';
class Player extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    $(PLAYERDOM).bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      dispatch(changeMusicStatus({
        volume: e.jPlayer.options.volume * 100,
        progress: e.jPlayer.status.currentPercentAbsolute,
        leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
      }));
    });

    $(PLAYERDOM).bind($.jPlayer.event.ended, (e) => {
      this.nextPlay();
    });
  }
  componentWillUnmount() {
    $(PLAYERDOM).unbind($.jPlayer.event.timeupdate);
  }

  formatTime = (time) => {
    time = Math.floor(time);
    let minites = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    const seconds = second < 10 ? `0${second}` : second;
    return `${minites}:${seconds}`;
  }

  changeProgressHandler = (progress) => {
    const { isPlay } = this.props.musicStatus;
    if (isPlay) {
      $(PLAYERDOM).jPlayer('play', duration * progress);
    }else{
      $(PLAYERDOM).jPlayer('play', duration * progress);
      $(PLAYERDOM).jPlayer('pause');
    }
  }
  changeVolumeHandler = (progress) => {
    $(PLAYERDOM).jPlayer('volume', progress);
  }
  play = () => {
    const { dispatch, musicStatus } = this.props;
    const { isPlay } = musicStatus;
    if (isPlay) {
      $(PLAYERDOM).jPlayer('pause');
    } else {
      $(PLAYERDOM).jPlayer('play');
    }
    dispatch(playMusic({
      isPlay: !isPlay
    }));
  }
  prevPlay = () => {
    const { musicStatus, musicList } = this.props;
    const { currentIndex } = musicStatus;
    const musicListLength = musicList.length;
    const newIndex = (currentIndex - 1 + musicListLength) % musicListLength;
    this.toPlay(newIndex);
  }
  nextPlay = () => {
    const { musicStatus, musicList } = this.props;
    const { currentIndex } = musicStatus;
    const musicListLength = musicList.length;
    const newIndex = (currentIndex + 1) % musicListLength;
    this.toPlay(newIndex);
  }
  toPlay = (newIndex) => {
    const { dispatch, musicList } = this.props;
    const nextPlayInfo = {
      currentMusicItem: musicList[newIndex],
      currentIndex: newIndex,
      progress: 0,
      isPlay: true,
      leftTime: 0
    }
    Util.playMusic(nextPlayInfo.currentMusicItem);
    dispatch(switchSong(nextPlayInfo));
  }
  render() {
    const { title, artist, cover } = this.props.currentMusicItem;
    const { progress, volume, isPlay, leftTime } = this.props.musicStatus;
    return (
        <div className="player-page">
          <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
          <div className="mt20 row">
            <div className="controll-wrapper">
              <h2 className="music-title">{title}</h2>
              <h3 className="music-artist mt10">{artist}</h3>
              <div className="row mt20">
                <div className="left-time -col-auto">-{leftTime}</div>
                <div className="volume-container">
                  <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                  <div className="volume-wrapper">
                    <Progress
                        progress={volume}
                        onProgressChange={this.changeVolumeHandler}
                        barColor={'#aaa'}
                    />
                  </div>
                </div>
              </div>
              <div style={{height: 10, lineHeight: '10px', marginTop: 10}}>
                <Progress
                    progress={progress}
                    onProgressChange={this.changeProgressHandler}
                >
                </Progress>
              </div>
              <div className="mt35 row">
                <div>
                  <i className="icon prev" onClick={this.prevPlay}></i>
                  <i className={`icon ml20 ${isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
                  <i className="icon next ml20" onClick={this.nextPlay}></i>
                </div>
                <div className="-col-auto">
                  <i className={`icon repeat-cycle`}></i>
                </div>
              </div>
            </div>
            <div className="-col-auto cover">
              <img src={cover} alt={title} />
            </div>
          </div>
        </div>
    )
  }
}
function select(state) {
  return {
    currentMusicItem: state.musicStatus.currentMusicItem,
    musicStatus: state.musicStatus,
    musicList: state.musicList
  }
}
const playConnet = connect(select)(Player);
export default playConnet;