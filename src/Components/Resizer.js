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

    // FIXME: Caution! HARDCODED
    const containerWidth = 600
    const containerHeight = 300

    // TODO: Find out better way to deal with styles -> lib fe.
    let state = { width: null,
                  height: null,
                  //TODO: Make setable from props
                  backgroundColor: "rgba(0, 0, 255, .5)",
                  position: 'relative'
    };

    if (this.props.scrollAxis === 'x') {
      state.width = containerWidth /2;
      state.height = containerHeight;
    }else if (this.props.scrollAxis === 'y') {
      state.width = containerWidth;
      state.height = containerHeight/2;
    }

    this.state = state;

    this.maxWidth = containerWidth;
    this.maxHeight = containerHeight;
    this.startX = null;
    this.startY = null;
    this.isResizing=  false;
  }
  componentWillMount() {
    const container = document.getElementById('resizerContainer');

    console.log(container);

  }


  addListeners() {
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  removeListeners() {
    // FIXME: Listeners will not remove from window
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  render() {
    let style = this.getStyle();

    return(
      <div style={style}>
        <ResizerHandle scrollAxis={this.props.scrollAxis} onMouseDown={this.onMouseDown.bind(this)}/>
        {this.props.children}
      </div>
    )
  }
  updateHeight(newHeight) {
      if (newHeight <= this.maxHeight){
        this.setState({height: newHeight});
      }
    }

  // User Interaction Methods
  onMouseDown(e) {
    this.isResizing = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.addListeners();
  }

  onMouseMove(e) {
    if (this.isResizing === true){
      if (this.props.scrollAxis === 'x') {
        let newWidth = this.calculateNewWidth(this.startX, this.state.width, e.clientX);

        if (newWidth <= this.maxWidth){
          this.setState({width: newWidth});
          this.startX = e.clientX;
        }

      }else if (this.props.scrollAxis === 'y') {
        let newHeight = this.calculateNewHeight(this.startY, this.state.height, e.clientY);

        if (newHeight <= this.maxHeight){
          this.setState({height: newHeight});
          this.startY = e.clientY;
        }
      }
    }
  }

  onMouseUp(e) {
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

  //TODO: Figure out how to get rid of this mess
  getStyle() {
    // Parsing
    return {width: this.state.width, height: this.state.height, backgroundColor: this.state.backgroundColor, position: this.state.position}
  }
}
