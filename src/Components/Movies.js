import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

class Movies extends React.Component {
  render() {
    return (
      <Container fluid id="movieContainer">
        <Carousel loop={true} rows={1} cols={3} id="carousel">
          {this.props.movies.map((movie, index) => (
              <Carousel.Item key={index}  className="movieCarousel">
                <Card className='movieCard'>
                  <Card.Body>
                    <Card.Title className="movieTitle">
                      {" "}
                      Title: {movie.title}{" "}
                    </Card.Title>
                    <Card.Text className="movieDescription">
                      Description: {movie.overview}
                    </Card.Text>
                    <Card.Img
                      src={movie.image_url}
                      alt={movie.title}
                      rounded="true"
                      id="cardImg"
                    />
                    <Card.Text className="movieText">
                      Votes: {movie.vote_average} Vote Count: {movie.vote_count}{" "}
                      Popularity: {movie.popularity}{" "}
                    </Card.Text>
                    <Card.Text className="movieText">
                      Release Date: {movie.released_on}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            ))}
        </Carousel>
      </Container>
    );
  }
}
export default Movies;
