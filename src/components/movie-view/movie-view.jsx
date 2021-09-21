import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './movie-view.scss';

export class MovieView extends React.Component {
  
  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster cent ">
          <img className="poster shadow-lg rounded" src={movie.ImagePath} />
        </div>
        <div className="movie-title cent my-5">
          <h2>{movie.Title}</h2>
        </div>
        <div className="movie-description  my-2">
          <span className="label font-weight-bold">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre my-2">
          <span className="label font-weight-bold">
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant=" info" className="my-3 font-weight-bold">
                Genre:{' '}
              </Button>
            </Link>
          </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>

        <div className="movie-director my-2">
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant=" info" className="my-3 font-weight-bold">
              Director:
            </Button>
          </Link>

          <span className="value">{movie.Director.Name}</span>
        </div>

        <Button
          onClick={() => {
            onBackClick(null);
          }}
          variant="info"
          className="my-3"
        >
          Back
        </Button>
      </div>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};