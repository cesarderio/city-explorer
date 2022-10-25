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
    this.setState({
      city: e.target.value
    })
  }
  getCityData = async (e) => {
    e.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityData = await axios.get(url);

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
        <Form id="city-form">
          <Form.Label>Search For A City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            id="formInput"
            onChange={this.handleChange}
          />
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
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
