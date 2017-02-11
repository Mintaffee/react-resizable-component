import React from 'react';
import ResizerHandle from './ResizerHandle';

export default class Resizer extends React.Component {

  static propTypes: {
    maxWidth: React.PropTypes.number.isRequired,
    maxHeight: React.PropTypes.number.isRequired,
    scrollAxis: React.PropTypes.string.isRequired
  }

  // Lifecycle Methods
  constructor(props) {
    super(props);

    let state = { width: null,
                  height: null,
                  backgroundColor: "rgba(0, 0, 255, .5)",
                  position: 'relative'
    };

    if (this.props.scrollAxis === 'x') {
      console.log('x');
      state.width = props.maxWidth /2;
      state.height = props.maxHeight;
    }else if (this.props.scrollAxis === 'y') {
      state.width = props.maxWidth;
      state.height = props.maxHeight/2;
    }

    this.state = state;

    this.maxWidth = props.maxWidth;
    this.maxHeight = props.maxHeight;
    this.startX = null;
    this.startY = null;
    this.isResizing=  false;
  }


  addListeners() {
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    console.log('listeners added')
  }

  removeListeners() {
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('mouseup', this.onMouseUp.bind(this));
    console.log('listeners removed')
  }

  render() {
    console.log(this.state);
    let style = this.getStyle();

    return(
      <div style={style}>
        <ResizerHandle scrollAxis={this.props.scrollAxis} onMouseDown={this.onMouseDown.bind(this)}/>
        {this.props.children}
      </div>
    )
  }

  // Update Methods
  updateWidth(newWidth) {
    if (newWidth <= this.maxWidth){
      this.setState({width: newWidth});
      console.log('State after width update');
      console.log(this.state);
    }
  }
  updateHeight(newHeight) {
      if (newHeight <= this.maxHeight){
        this.setState({height: newHeight});
      }
    }

  // User Interaction Methods
  onMouseDown(e) {
    console.log('down');
    this.isResizing = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.addListeners();
  }

  onMouseMove(e) {
    if (this.isResizing === true){
      if (this.props.scrollAxis === 'x') {
        let newWidth = this.calculateNewWidth(this.startX, this.state.width, e.clientX);
        this.updateWidth(newWidth);
        this.startX = e.clientX;
      }else if (this.props.scrollAxis === 'y') {
        let newHeight = this.calculateNewHeight(this.startY, this.state.height, e.clientY);
        this.updateHeight(newHeight);
        this.startY = e.clientY;
      }
    }

  }

  onMouseUp(e) {
    console.log('up');
    this.isResizing = false;
    this.removeListeners();
  }

  // Utilities

  calculateNewWidth(onClickX, originWidth, clientX) {
    let widthDiff = clientX - onClickX;
    let newWidth = originWidth + widthDiff;
    return newWidth;
  }

  calculateNewHeight(onClickY, originHeight, clientY) {
    let heightDiff = clientY - onClickY;
    let newHeight = originHeight + heightDiff;
    return newHeight;
  }

  getStyle() {
    // Parsing
    return {width: this.state.width, height: this.state.height, backgroundColor: this.state.backgroundColor, position: this.state.position}
  }
}
