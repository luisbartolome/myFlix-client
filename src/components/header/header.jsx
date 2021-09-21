import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';

export function Header(props) {
  

  return(
      
    <Navbar collapseOne expand="lg" bg="dark" variant="dark">
     <Container>
    <Navbar.Brand href="#home">My Flix App
    </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href='/'>Home</Nav.Link>
      <Nav.Link href='/profile'>Profile</Nav.Link>
      <Nav.Link href="Logout">Logout</Nav.Link>
     </Nav>
     </Container>
  </Navbar>
    
  
  );
}


export default Header;