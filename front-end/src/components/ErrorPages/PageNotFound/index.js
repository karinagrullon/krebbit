import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function PageNotFound() {
  return (
    <div>
      <Container className="Home-page-container">
        <Row>
          <Col><h2 className="Page-desc">404 Page Not Found</h2></Col>
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