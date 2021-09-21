import React, { useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, InputGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import './login-view.scss'

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //The extra (e) in the code, as well as the e.preventDefault(); method, prevents the default refresh/change of the page from the handleSubmit() method.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios
      .post(`https://backend-myflix1.herokuapp.com/login`, {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log('no such user');
      });
  };

  return(
      
      <Container className="login-view" className="center">
      <h1 className="title">myFlix</h1>
      <Row>
        <Form className="login was-validated" noValidate>
      <Form.Group controlId="formUsername">
        <Form.Label>
          Username:
        </Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <Form.Control.Feedback type="valid">
              awesome you did it!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              This field is mandatory!
            </Form.Control.Feedback>
      </Form.Group>
      
      <InputGroup hasValidation>
      <Form.Group controlId="formPassword">
        <Form.Label>
        Password:
        </Form.Label>
        <Form.Control  required type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Form.Control.Feedback type="valid">
              awesome you did it!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              This field is mandatory!
            </Form.Control.Feedback>
      </Form.Group>
      </InputGroup>
      </Form>
      </Row>
    
      <div className="middle">
          <Button
            className="m-3"
            variant="info"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Form.Group
            className="registration-group"
            controlId="formRegistration"
          >
            <Form.Text className="text-light">Don't have an account?</Form.Text>
            <Link to={`/register`}>
              <Button className="register-link" variant="dark">
                Register here
              </Button>
            </Link>
          </Form.Group>
          </div>
        </Container>
  );  
}