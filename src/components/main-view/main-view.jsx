import React from 'react';
import axios from 'axios';


import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import  Header  from '../header/header';

// import Container from 'react-bootstrap/Container';
import { Container } from 'react-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';
export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://backend-myflix1.herokuapp.com/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
        console.log(this.movies);
      })
      .catch((error) => {
        console.log(error);
      });
  }
 
  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
          });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (user === 'newUser') return <RegistrationView onRegistration={user => this.onRegister(user)}/>
       
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
   if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

  // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

  
    return (
      <Container fluid>
        <Header/>
      <Row className="main-view justify-content-md-center">
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col xs={12} sm={6} md={4} lg={4} key={movie._id}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
      </Container>
    );
  }
}

// so we  get rid of the curly braces when importing MainView in index.jsx
export default MainView;