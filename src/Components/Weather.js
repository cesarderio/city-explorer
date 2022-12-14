
import { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import DaysForecast from "./DaysForecast";
class Weather extends Component {
  render() {
    return (
          <Accordion defaultActiveKey="0">
            {this.props.weather.map((day, index) => (
              <DaysForecast
                key={day.date}
                date={day.date}
                description={day.description}
              />
            ))}
          </Accordion>
    );
  }
}
export default Weather;
