import React from 'react';
import Resizer from './Components/Resizer';

import './Stylesheets/App.css';

class App extends React.Component {
  render() {
    return (
      <div className={'avocado-container'}>
        <Resizer width={300} height={300} maxWidth={600}></Resizer>
      </div>
    );
  }
}

export default App;
