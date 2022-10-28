import { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css"
import Main from './Main';
import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';

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
