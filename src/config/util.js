/**
 * Created by wuyujie on 2017/11/15.
 */

const Util = {
  playMusic: (musicItem) => {
    $('#player').jPlayer('setMedia', {
      mp3: musicItem.file
    }).jPlayer('play');
  }
}

export default Util;