
import { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

class CityLocation extends Component {
  

  render() {
    let getMapImg =`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.props.lat},${this.props.lon}&zoom=12&size=480x480`
    return (
  
      <Container>
          <Card id="map">
            <Card.Title>City: {this.props.name}</Card.Title>
            <Card.Text>Latitude: {this.props.lat}</Card.Text>
            <Card.Text>Longitude: {this.props.lon}</Card.Text>
            <Card.Img id="mapImg" src={getMapImg} />
          </Card>
      </Container>
    );
  }
}
export default CityLocation;




