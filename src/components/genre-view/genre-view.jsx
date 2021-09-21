import React from 'react';
import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container fluid className="GenreView">
        <div className="genre-view">
          <div className="genre-name">
            <span className="label font-weight-bold">Genre: </span>
            <span className="value">{genre.Name}</span>
          </div>
          <div className="genre-description">
            <span className="label font-weight-bold">Description: </span>
            <span className="value">{genre.Description}</span>
          </div>
          <Button
            variant="info"
            size="sm"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </div>
      </Container>
    );
  }
}

GenreView.propTypes = {
  girector: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired,
}; 