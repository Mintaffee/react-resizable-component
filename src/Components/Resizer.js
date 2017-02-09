import React from 'react';

export default class Resizer extends React.Component {
  constructor() {
    super();
    const style = {
      "width": 300,
      "height": 300,
      "backgroundColor": "red",
      "opacity": 0.1
    }
    this.state = { style };
  }

  render() {
    return(
      <div style={this.state.style}>
      </div>
    )
  }
}
