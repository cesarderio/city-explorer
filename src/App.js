import { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css"
import Main from './Main';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    );
  }
}
export default App;
