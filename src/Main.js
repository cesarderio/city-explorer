import { Component } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Error from "./Error";
import CityLocation from "./CityLocation";


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: '',
      lat: 0,
      lon: 0,
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    console.log('target.data',e.target.value);
    this.setState({
      city: e.target.value
    })
  }

getWeatherData = async (e) => {
  e.preventDefault();
  // console.log(this.state.city);
      try {
        let url = `{process.env.REACT_APP_SERVER}/weather?city=${this.StaticRange.city}`
  
        let weatherData = await axios.get(url);
        console.log('weatherData',weatherData.data);
  
        this.setState({
          cityData: cityData.data[0],
          error: false,
          lat: this.state.weatherData.lat,
          lon: this.state.weatherData.lon,
        });
  
      } catch(error){
        if(this.state.error){
         return `${this.state.errorMessage}`
        }
        this.setState({
          error: true,
          errorMessage: error.message
        })
      }
    }
}

  getCityData = async (e) => {
    e.preventDefault();
console.log(this.state.city);
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityData = await axios.get(url);
      console.log('cityData',cityData.data);

      this.setState({
        cityData: cityData.data[0],
        error: false,
        lat: this.state.cityData.lat,
        lon: this.state.cityData.lon,
      });

    } catch(error){
      if(this.state.error){
       return `${this.state.errorMessage}`
      }
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.getCityData} id="city-form">
          <Form.Label>Search For A City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            id="formInput"
            onChange={this.handleInput}
          />
          <Button variant="primary" type="submit" >
            Explore!
          </Button>
        </Form>
        {this.state.cityData.place_id && (
          <CityLocation
            name={this.state.cityData.display_name}
            lat={this.state.cityData.lat}
            lon={this.state.cityData.lon}
          />
        )}
        {this.state.error && <Error error={this.state.errorMessage} />}
      </Container>
    );
  }
}
export default Main;
