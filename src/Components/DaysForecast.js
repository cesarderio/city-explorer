import React from "react";
import { Card } from "react-bootstrap";

class DaysForecast extends React.Component {
  render(){
    return(
      <Card className='weather'key={this.key}>
        <Card.Title>City Forecast</Card.Title>
        <Card.Text >
          description{this.props.description}
          date: {this.props.date}
        </Card.Text>
      </Card>
    )
  }
}
export default DaysForecast;
