import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import  Header  from '../header/header';
import { DirectorView } from '../director-view/director-view';
import  { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { Container } from 'react-bootstrap';

//React-router-DOM components
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
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
      userData: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
      
    }
  }

  // Log In

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token)
    
  }
// Log Out

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
      userData:[]
    });
  }

  //  Get user recent data from DB
  getUsers(token) {
    axios.post('https://backend-myflix1.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          users: response.data
        });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //   Get all movies in DB
  getMovies(token) {
    axios.get('https://backend-myflix1.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  addToFavorites(movieId){
    axios.post('https://backend-myflix1.herokuapp.com/users/movies/${localStorage.user}/${movieId}', {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      // Assign the result to the state
      console.log(response)
      console.log(movieId+' was added') 
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  removeMovie(movieId){
    axios.post('https://backend-myflix1.herokuapp.com/users/movies/${localStorage.user}/${movieId}/remove', {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      // Assign the result to the state
      console.log(response)
      console.log(movieId+' was removed')       
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  unRegister(){
  axios.delete('https://backend-myflix1.herokuapp.com/users/${localStorage.user}', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
  })
  .then(response => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
      // Assign the result to the state
      this.setState({
        user: null,
        userData:[]
      });
    }
  ).catch(function (error) {
    console.log(error);
  });
}

setSelectMovie(newSelectedMovie){
  this.setState({
      selectedMovie: newSelectedMovie
  });
}

render() {
    const { movies, user, history } = this.state;

return (
      <Router>
          <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/profile" render={() => {
            if (!user) return <Col>
              <ProfileView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path='/users/:username' render={({ history }) => {
            if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
            if (movies.length === 0) return;
            return <ProfileView history={history} movies={movies} />
          }} />

        </Row>
      </Router>
    );
  }
};

export default MainView;