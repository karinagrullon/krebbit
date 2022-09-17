import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Banner from '../Banner';
import MainPageStoriesSection from '../MainPageStoriesSection';

function ContainerExample() {
  return (
    <div>
      <Banner />
      <Container fluid className="App-wrapper-container">
        <Row>
          <Col><MainPageStoriesSection /></Col>
        </Row>
        <Row>
          <Col><p>Other links</p></Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContainerExample;