import React, { Component } from 'react';
import './index.less';
export default class Progress extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    barColor: '#2f9842'
  }
  changeProgress = (e) => {
    let progressBar = this.refs.progressBar;
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    this.props.onProgressChange && this.props.onProgressChange(progress);
  }
  render() {
    return (
        <div className="music-progress row" ref="progressBar" onClick={this.changeProgress}>
          <div className="progress" style={{width: `${this.props.progress}%`, background: this.props.barColor}}></div>
        </div>
    );
  }
}