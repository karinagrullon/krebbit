import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import KrebbitIcon from '../../images/icons/frog-57x57.png';
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import '../../App.css';

function BasicExample() {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>
            <Link to="/">
              <span className="Home-image">
                  <img
                      src={ KrebbitIcon }
                      width="33"
                      height="33"
                      className="d-inline-block align-top"
                      alt="React Bootstrap logo"
                  />
              </span>
              <span className="Home-word-wrapper">
                  Krebbit
              </span>
            </Link>
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Stories" id="basic-nav-dropdown" className="Main-menu-items">
                <NavDropdown.Item className="Purple-active" href="#"><HashLink to="/#age">Age</HashLink></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="Purple-active" href="#"><HashLink to="/#lenght">Lenght</HashLink></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="Purple-active" href="#"><HashLink to="/#topic">Topic</HashLink></NavDropdown.Item>
              </NavDropdown>
              <Nav.Link><Link to="/about-page">About</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;