import React from 'react';
import Resizer from './Components/Resizer';

import './Stylesheets/App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className={'avocado-container'} ref='resizerContainer'>
          <Resizer scrollAxis={'y'}>
          </Resizer>
        </div>
      </div>
    );
  }
}

export default App;
