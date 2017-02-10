import React from 'react';

export default class ResizerHandle extends React.Component {

  // Lifecycle Methods
  constructor(props) {
    super(props);

    this.state = {style: {
                    width: '10px',
                    height: '100%',
                    backgroundColor: "rgba(255, 0, 0, 1)",
                    cursor: 'col-resize',
                    top: 0,
                    right: 0,
                    position: 'absolute'

    }};
  }

  render() {
    return(
      <div style={this.state.style} onMouseDown={this.props.onMouseDown}>
      </div>
    )
  }
}
