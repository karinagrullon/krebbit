import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import KribberIcon from '../../images/icons/frog-57x57.png';
import '../../App.css';

function BasicExample() {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>
            <span class="Home-image">
                <img
                    src={ KribberIcon }
                    width="33"
                    height="33"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </span>
            <span class="Home-word-wrapper">
                Kribber
            </span>
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Stories" id="basic-nav-dropdown" className="Main-menu-items">
                <NavDropdown.Item className="Purple-active" href="#action/3.1"><a href="#age">Age</a></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="Purple-active" href="#action/3.2"><a href="#lenght">Lenght</a></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="Purple-active" href="#action/3.3"><a href="#topic">Topic</a></NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#link">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;