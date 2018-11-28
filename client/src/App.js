import React, { Component } from 'react';
import AvatarList from './AvatarList';
import Navbar from './Navbar';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <AvatarList />
      </div>
    );
  }
}

export default App;
