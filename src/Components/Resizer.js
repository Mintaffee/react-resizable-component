import React from 'react';
import ResizerHandle from './ResizerHandle';

export default class Resizer extends React.Component {

  // Lifecycle Methods
  constructor(props) {
    super(props);

    this.state = {startX: null,
                  maxWidth: this.props.maxWidth,
                  width: this.props.width,
                  maxHeight: this.props.maxHeight,
                  height: this.props.height,
                  backgroundColor: "rgba(0, 0, 255, .5)",
                  isResizing: false,
                  position: 'relative'
    };
  }

  addListeners() {
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  removeListeners() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  render() {
    let style = this.getParsedStyleObject();

    return(
      <div style={style}>
        <ResizerHandle onMouseDown={this.onMouseDown.bind(this)}/>
      </div>
    )
  }

  // Update Methods
  updateColor(newColor) {
    this.setState({backgroundColor: newColor});

  }

  updateWidth(newWidth) {
    if (newWidth <= this.state.maxWidth){
      this.setState({width: newWidth});
    }
  }

  // User Interaction Methods
  onMouseDown(e) {
    console.log('down');
    this.setState({ isResizing: true})
    this.setState({ startX: e.clientX});
    this.addListeners();
  }

  onMouseMove(e) {
    console.log('move');
    // console.log(e.clientX);
    if (this.state.isResizing === true){
      let newWidth = this.calculateNewWidth(this.state.startX, this.state.width, e.clientX);
      this.updateWidth(newWidth);
      this.setState({ startX: e.clientX});
    }

  }

  onMouseUp(e) {
    console.log('up');
    this.setState({ isResizing: false})
    this.removeListeners();
  }

  // Utilities

  calculateNewWidth(onClickX, originWidth, clientX) {

    let widthDiff = clientX - onClickX;

    let newWidth = originWidth + widthDiff;

    return newWidth;
  }

  getParsedStyleObject() {
    return {width: this.state.width, height: this.state.height, backgroundColor: this.state.backgroundColor, opacity: this.state.opacity, position: this.state.position}
  }
}
