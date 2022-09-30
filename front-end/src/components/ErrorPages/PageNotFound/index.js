import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function PageNotFound() {
  return (
    <div>
      <Container fluid className="Home-page-container">
        <Row>
          <Col>404 Page Not Found</Col>
        </Row>
        <Row>
        <Col></Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default PageNotFound;