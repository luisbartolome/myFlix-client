// Import components
import React from 'react';
import PropTypes from 'prop-types';

// Import styling
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
// Import routing
import axios from 'axios';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      newUsername: '',
      newEmail: '',
      newPassword: '',
      newBirthday: '',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.getUser(token);
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get('https://backend-myflix1.herokuapp.com/${username}', config)
      .then((res) => {
        res.data.map((item) => {
          this.setState({
            userData: item,
          });
        });
      })
      .catch((e) => console.log('Error Retrieving User Data'));
  }

  // Adds input data to state
  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });
  // Remove account and log out user, returning to loginView
  handleRemoveAccount = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete('https://backend-myflix1.herokuapp.com/users/${username}', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('account deleted');
      })
      .catch((e) => console.log('error'));
    this.props.handleRemoveAccount();
  };

  handleUpdateAccount = (e) => {
    e.preventDefault();

    // Credentials
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // Form Data
    const { newUsername, newPassword, newEmail, newBirthday } = this.state;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        'https://backend-myflix1.herokuapp.com/users/${username}',
        {
          Username: newUsername,
          Password: newPassword,
          Email: newEmail,
          Birthday: newBirthday,
        },
        config
      )

      .then((res) => {
        console.log('Account Updated');
        window.open('/', '_self');
        this.props.handleUpdateAccount();
      })
      .catch((e) => console.log('Update Error'));
  };

  render() {
    const { userData } = this.state;
    if (!userData) return null;

    return (
      <>
        <Container className="my-3">
          <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
            <div className="mb-2">
              <h2 className="d-flex justify-content-center h4 text-dark font-weight-bold ">
                Update Your Information
              </h2>
            </div>
            <Form className="mb-2" onSubmit={this.handleUpdateAccount}>
              <Form.Group className="mb-2" controlId="registerUsername">
                <Form.Control
                  type="text"
                  placeholder="New username"
                  name="newUsername"
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="registerPassword">
                <Form.Control
                  type="password"
                  placeholder="New password"
                  name="newPassword"
                  onChange={this.handleInputChange}
                  required
                  minLength="5"
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="registerEmail">
                <Form.Control
                  type="email"
                  placeholder="New email"
                  name="newEmail"
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="registerBirthday">
                <Form.Label className="mb-1 text-light">Birthday</Form.Label>
                <Form.Control
                  type="date"
                  name="newBirthday"
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>

              <Button
                className="update-button w-100 btn-lg"
                variant="info"
                type="submit"
              >
                Update
              </Button>
            </Form>
            <small className="text-light text-center d-block">
              Or you can{' '}
              <Link to="/">
                <span
                  className="register text-primary"
                  onClick={this.handleRemoveAccount}
                >
                  remove your account
                </span>
              </Link>
            </small>
          </Col>
        </Container>
      </>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.object,
  deleteAccount: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
};