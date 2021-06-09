import React, { Component } from 'react';
import { render } from 'react-dom';
import Random from './components/Random';
import './style.css';


class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Random />
    );
  }
}

render(<App />, document.getElementById('root'));
