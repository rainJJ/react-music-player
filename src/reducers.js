/**
 * Created by wuyujie on 2017/10/31.
 */

import { combineReducers } from 'redux';
import { DELETE_MUSIC, PLAY, MusicStatus } from './actions';
const { CHANGE_MUSIC_STATUS, SWITCH_SONG } = MusicStatus;
import MUSIC_LIST from './config/config';


const musicStatus = (state = {currentMusicItem: MUSIC_LIST[0], currentIndex: 0, progress: 0, volume: 0, isPlay: true, leftTime: 0}, action) => {
  switch (action.type) {
    case PLAY:
      return Object.assign({}, state, action.playStatus);
    case CHANGE_MUSIC_STATUS:
      return Object.assign({}, state, action.obj);
    case SWITCH_SONG:
      return Object.assign({}, state, action.currentMusic);
    default:
      return state;
  }
}

const musicList = (state = MUSIC_LIST, action) => {
  switch (action.type) {
    case DELETE_MUSIC:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    default:
      return state
  }
}

const todoApp = combineReducers({
  musicList,
  musicStatus
})

export default todoApp
