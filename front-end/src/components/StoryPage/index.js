import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Lato from 'lato-font';

import MrMcKay1 from '../../stories/mr-mckay/1.jpeg';
import MrMcKay2 from '../../stories/mr-mckay/2.jpg';
import MrMcKay3 from '../../stories/mr-mckay/3.jpg';

function StoryPage() {
  const carouselRef = React.useRef(null);

  const onPrevPageClick = () => {
    carouselRef.current.prev();
  };

  const onNextPageClick = () => {
    carouselRef.current.next();
  };

  return (
    <div>
      <Container className="Story-page-wrapper">
        <Row>
          <Col sm={1}></Col>
          <Col sm={10}><Button onClick={onPrevPageClick} className="Story-player Story-player-previous-page">{`|<`}</Button>
          <Button className="Story-player Story-player-previous-word">{`<<`}</Button>
          <Button className="Story-player Story-player-play">{`>`}</Button>
          <Button className="Story-player Story-player-next-word">{`>>`}</Button>
          <Button onClick={onNextPageClick} className="Story-player Story-player-next-page">{`>|`}</Button></Col>
          <Col sm={1}></Col>
        </Row>
        <Row>
        <Col></Col>
        </Row>
        <Row>
          <Col>
            <Carousel variant="dark" fade ref={carouselRef}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={ MrMcKay1 }
                  width="1300"
                  height="770"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={ MrMcKay2 }
                  width="1300"
                  height="770"
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={ MrMcKay3 }
                  width="1300"
                  height="770"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StoryPage;