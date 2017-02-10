import React from 'react';

export default class Resizer extends React.Component {

  // Lifecycle Methods
  constructor(props) {
    super(props);

    this.state = {startX: null,
                  width: this.props.width,
                  height: this.props.height,
                  backgroundColor: "red",
                  opacity: 0.1,
                  isResizing: false
    };
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));

  }

  componentWillUnmount(){
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  render() {
    let style = this.getParsedStyleObject();

    return(
      <div style={style} onMouseDown={this.onMouseDown.bind(this)}>
      </div>
    )
  }

  // Update Methods
  updateColor(newColor) {
    this.setState({backgrossundColor: newColor});

  }

  updateWidth(newWidth) {
    this.setState({width: newWidth});
  }

  // User Interaction Methods
  onMouseDown(e) {
    console.log('down');
    this.setState({ isResizing: true})
    this.setState({ startX: e.clientX});
  }

  onMouseMove(e) {
    console.log('move');
    // console.log(e.clientX);
    if (this.state.isResizing === true){
      let newWidth = this.calculateNewWidth(this.state.startX, this.state.width, e.clientX);
      this.updateWidth(newWidth);
      // this.setState({ startX: e.clientX});
    }

  }

  onMouseUp(e) {
    console.log('up');
    this.setState({ isResizing: false})
  }

  // Utilities

  calculateNewWidth(onClickX, originWidth, clientX) {

    let widthDiff = clientX - onClickX;

    let newWidth = originWidth + widthDiff;

    return newWidth;
  }

  getParsedStyleObject() {
    return {width: this.state.width, height: this.state.height, backgroundColor: this.state.backgroundColor, opacity: this.state.opacity}
  }
}
