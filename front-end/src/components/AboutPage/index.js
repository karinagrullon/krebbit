import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Banner from '../Banner';

function AboutPage() {
  return (
    <div>
      <Container className="App-wrapper-container">
        <Row>
          <Col><Col><h2 className="Page-desc">About</h2></Col></Col>
        </Row>
        <Row>
          <Col>
          <div className="about-page-content">
          Krebbit serves as an aid for young children to learn how to read. 
          It offers two reading options for parents and children to choose from based on your current reading goals. 
          The application is based on short stories with or without basic illustrations.
          </div>
          </Col>
        </Row>
        <Row>
        <Col><hr /></Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutPage;