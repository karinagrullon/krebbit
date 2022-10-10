import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Banner from '../Banner';
import MainPageStoriesSection from '../MainPageStoriesSection';
import MainPageNavigationSection from '../MainPageNavigationSection';

function HomePage(props) {
  return (
    <div>
      <Banner />
      <Container fluid className="App-wrapper-container">
        <Row>
          <Col><MainPageStoriesSection storiesData={props.storiesData} /></Col>
        </Row>
        <Row>
        <Col></Col>
        </Row>
        <Row>
          <Col><MainPageNavigationSection /></Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;