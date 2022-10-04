import React from 'react';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { faForward } from '@fortawesome/free-solid-svg-icons'
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons'
import { faForwardStep } from '@fortawesome/free-solid-svg-icons'

import MrMcKay1 from '../../stories/mr-mckay/1.jpeg';
import MrMcKay2 from '../../stories/mr-mckay/2.jpg';
import MrMcKay3 from '../../stories/mr-mckay/3.jpg';

function StoryPage() {
  const carouselRef = React.useRef(null);

  const previousWordArrowUpPress = useKeyPress('ArrowUp');
  const nextWordArrowDownPress = useKeyPress('ArrowDown');
  const previousPageArrowLeftPress = useKeyPress('ArrowLeft');
  const nextPageArrowRightPress = useKeyPress('ArrowRight');

  const playIcon = <FontAwesomeIcon icon={faPlay} />
  const backwardIcon = <FontAwesomeIcon icon={faBackward} />
  const forwardIcon = <FontAwesomeIcon icon={faForward} />
  const backwardStepIcon = <FontAwesomeIcon icon={faBackwardStep} />
  const forwardStepIcon = <FontAwesomeIcon icon={faForwardStep} />

  const onPrevPageClick = () => {
    carouselRef.current.prev();
  };

  const onNextPageClick = () => {
    carouselRef.current.next();
  };

  const previousPageTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="Krebbit-tooltip">
      Previous page
    </Tooltip>
  );

  const previousWordTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="Krebbit-tooltip">
      Previous word
    </Tooltip>
  );

  const playTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="Krebbit-tooltip">
      Play
    </Tooltip>
  );

  const nextWordTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="Krebbit-tooltip">
      Next word
    </Tooltip>
  );

  const nextPageTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="Krebbit-tooltip">
      Next page
    </Tooltip>
  );

  return (
    <div>
      <Container className="Story-page-wrapper">
        <Row>
          <Col sm={1}></Col>
          <Col sm={10}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 100 }}
            overlay={previousPageTooltip}
          >
            <Button onClick={onPrevPageClick} className="Story-player Story-player-previous-page">{backwardStepIcon}</Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 100 }}
            overlay={previousWordTooltip}
          >
            <Button className="Story-player Story-player-previous-word">{backwardIcon}</Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 100 }}
            overlay={playTooltip}
          >
            <Button className="Story-player Story-player-play">{playIcon}</Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 100 }}
            overlay={nextWordTooltip}
          >
            <Button className="Story-player Story-player-next-word">{forwardIcon}</Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 100 }}
            overlay={nextPageTooltip}
          >
            <Button onClick={onNextPageClick} className="Story-player Story-player-next-page">{forwardStepIcon}</Button>
          </OverlayTrigger>
          </Col>
          <Col sm={1}>{previousWordArrowUpPress && "up"}{previousPageArrowLeftPress && "left"}{nextPageArrowRightPress && "right"}</Col>
        </Row>
        <Row>
        <Col></Col>
        </Row>
        <Row>
          <Col>
            <Carousel interval={null} variant="dark" fade ref={carouselRef}>
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

// Hook
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

export default StoryPage;