import React from 'react';

export default class ResizerHandle extends React.Component {

  // Lifecycle Methods
  constructor(props) {
    super(props);

    let style = { width: null,
                  height: null,
                  backgroundColor: "rgba(255, 0, 0, 1)",
                  cursor: null,
                  top: null,
                  right: null,
                  left: null,
                  bottom: null,
                  position: 'absolute'

    };
    if (this.props.scrollAxis === 'x') {
      style.width = '10px';
      style.height = '100%';
      style.top = 0;
      style.right = 0;
      style.cursor = 'col-resize';
    }else if (this.props.scrollAxis === 'y') {
      style.width = '100%';
      style.height = '10px';
      style.bottom = 0;
      style.right = 0;
      style.cursor = 'row-resize';
    }

    this.state = {style};
  }

  render() {
    return(
      <div style={this.state.style} onMouseDown={this.props.onMouseDown}>
      </div>
    )
  }
}
