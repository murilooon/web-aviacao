import React, {Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import LogIn from './login';

class NavbarHeader extends Component {
  render () {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Aviação</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/models">Modelos</Nav.Link>
            <Nav.Link href="/airplanes">Aviões</Nav.Link>
            <LogIn />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavbarHeader;
