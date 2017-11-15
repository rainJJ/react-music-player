/**
 * Created by wuyujie on 2017/10/31.
 */

/*
 * action 类型
 */

export const PLAY = 'PLAY';
export const DELETE_MUSIC = 'DELETE_MUSIC';

/*
 * 其它的常量
 */

export const MusicStatus = {
  CHANGE_MUSIC_STATUS: 'CHANGE_MUSIC_STATUS',
  SWITCH_SONG: 'SWITCH_SONG'
};

/*
 * action 创建函数
 */

export const deleteMusic = (index) => {
  return {
    type: DELETE_MUSIC,
    index
  }
}
export const changeMusicStatus = (obj) => {
  return {
    type: MusicStatus.CHANGE_MUSIC_STATUS,
    obj
  }
}
export const playMusic = (playStatus) => {
  return {
    type: PLAY,
    playStatus
  }
}

export const switchSong = (currentMusic) => {
  return {
    type: MusicStatus.SWITCH_SONG,
    currentMusic
  }
}