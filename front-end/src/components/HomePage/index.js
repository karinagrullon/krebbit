import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Banner from '../Banner';
import MainPageStoriesSection from '../MainPageStoriesSection';
import MainPageNavigationSection from '../MainPageNavigationSection';
import StoryPage from '../StoryPage';

function HomePage() {
  return (
    <div>
      <Banner />
      <Container fluid className="App-wrapper-container">
        <Row>
          <Col><MainPageStoriesSection /></Col>
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