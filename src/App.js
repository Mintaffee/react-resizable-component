import React from 'react';
import Resizer from './Components/Resizer';

import './Stylesheets/App.css';

class App extends React.Component {
  render() {
    return (
      <div className={'avocado-container'}>
        <Resizer maxWidth={600} maxHeight={300} scrollAxis={'x'}>
        </Resizer>
      </div>
    );
  }
}

export default App;
