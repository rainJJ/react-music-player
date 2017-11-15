import React, {Component} from 'react';
import { connect } from 'react-redux';
import MusicListItem from '../MusicListItem/index';
import Util from '../../config/util';
import { deleteMusic, switchSong } from '../../actions';

class List extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  deleteHandle = (index) => {
    const { dispatch, musicStatus, musicList } = this.props;
    const { currentIndex } = musicStatus;
    let playInfo;
    if (index !== currentIndex) {
      dispatch(deleteMusic(index));
    } else {
      if (index < musicList.length - 1) {
        playInfo = {
          currentMusicItem: musicList[index + 1],
          currentIndex: index,
          progress: 0,
          isPlay: true
        }
      } else {
        playInfo = {
          currentMusicItem: musicList[0],
          currentIndex: 0,
          progress: 0,
          isPlay: true
        }
      }
      dispatch(deleteMusic(index));
      Util.playMusic(playInfo.currentMusicItem);
      dispatch(switchSong(playInfo));
    }
  }
  playHandle = (item, index) => {
    const { dispatch, musicStatus } = this.props;
    const { currentIndex } = musicStatus;
    if (index !== currentIndex) {
      const currentPlay = {
        currentMusicItem: item,
        currentIndex: index,
        progress: 0,
        isPlay: true
      }
      Util.playMusic(currentPlay.currentMusicItem);
      dispatch(switchSong(currentPlay));
    }
  }
  render() {
    const { musicStatus } = this.props;
    const { currentMusicItem } = musicStatus;
    return (
        <ul>
          {
            this.props.musicList.map((item, index) => {
              return (
                  <MusicListItem key={item.id} focus={item === currentMusicItem} musciItem={item} playChange={this.playHandle.bind(this, item, index)} deleteIndex={this.deleteHandle.bind(this, index)} />
              )
            })
          }
        </ul>
    );
  }
}
function select(state) {
  return {
    musicStatus: state.musicStatus,
    musicList: state.musicList
  }
}
const listConnet = connect(select)(List);
export default listConnet;