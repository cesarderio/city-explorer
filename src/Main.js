import { Component } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Error from "./Error";
import CityLocation from "./CityLocation";
import Weather from "./Weather";
import Movies from "./Movies"
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: [],
      error: false,
      errorMessage: "",
      // lat: 0,
      // lon: 0,
      weatherData: [],
      movies: [],
      map: null,
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    console.log("target.data", e.target.value);
    this.setState({
      city: e.target.value,
    });
  };

  getWeatherData = async (location) => {
    let url = `${process.env.REACT_APP_SERVER}/weather?cityName=${this.state.city}&lat=${location.lat}&lon=${location.lon}`;
    // key=${process.env.REACT_APP_WEATHER_API_KEY}/weather?cityName=${this.state.city}&lat=${location.lat}&lon=${location.lon}`;
    try {
      let weatherData = await axios.get(url);
   console.log(weatherData.data);

      this.setState({
        weatherData: weatherData.data,
        error: false,
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
      });
    }
  };

  getCityData = async (e) => {
    e.preventDefault();
    try {
      let locationUrl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;

      let locationData = await axios.get(locationUrl);
      this.getWeatherData(locationData.data[0]);
      this.getMovies();

      this.setState({
        cityData: locationData.data[0],
        error: false,
        lat: locationData.data[0].lat,
        lon: locationData.data[0].lon,
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
      });
    }
  };

  getMovies = async () => {
    const url = `${process.env.REACT_APP_SERVER}/movies?citymovie=${this.state.city}`
    const response = await axios.get(url);
    console.log(response);
    this.setState({ movies: response.data });
  };

  render() {
    console.log(this.state);
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
          <Button variant="primary" type="submit">
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
        {this.state.weatherData.length && (
          <Weather weather={this.state.weatherData}/>
        )}
        {this.state.cityData.place_id && (
          <Movies movies={this.state.movies}/>
        )}
        {this.state.error && <Error error={this.state.errorMessage} />}
      </Container>
    );
  }
}
export default Main;
