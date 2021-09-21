import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

//Components & Styling
import Button from 'react-bootstrap/Button';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;
    
    
    return (
      <Card style={{ width: '15rem' }} className="movie-card">
        <Card.Body>
          <Card.Img variant="top" src={movieData.ImagePath} />
          <Card.Title>{movieData.Title}</Card.Title>
          
        </Card.Body>
        <Link  to={`/movies/${movieData._id}`}>
          <Button variant="primary" style={{ width: '15rem'}}>Open</Button>
        </Link>
        {/* <Button variant="primary" onClick={()=> onMovieClick(movieData)}>Open</Button> */}
      </Card>    
    );  
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  // onMovieClick: PropTypes.func.isRequired
}; 