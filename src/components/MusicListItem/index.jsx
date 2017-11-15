import React, {Component} from 'react';
import './index.less';
export default class MusicListItem extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentWillUnmount() {

  }
  delete = (e) => {
    e.stopPropagation();
    this.props.deleteIndex();
  }
  render() {
    const musicItem = this.props.musciItem;
    return (
        <li onClick={this.props.playChange} className={`components-musiclistitem ${this.props.focus ? 'focus' : ''}`}>
          <p>{musicItem.title} - {musicItem.artist}</p>
          <p className="delete" onClick={this.delete}></p>
        </li>
    );
  }
}