import React, { Component } from 'react';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { faForward } from '@fortawesome/free-solid-svg-icons'
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons'
import { faForwardStep } from '@fortawesome/free-solid-svg-icons'

import MrMcKay1 from '../../stories/mr-mckay/1.jpeg';
import MrMcKay2 from '../../stories/mr-mckay/2.jpg';
import MrMcKay3 from '../../stories/mr-mckay/3.jpg';

class StoryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stories: [],
      // carouselRef: React.useRef(null),
      playIcon: <FontAwesomeIcon icon={faPlay} />,
      backwardIcon: <FontAwesomeIcon icon={faBackward} />,
      forwardIcon: <FontAwesomeIcon icon={faForward} />,
      backwardStepIcon: <FontAwesomeIcon icon={faBackwardStep} />,
      forwardStepIcon: <FontAwesomeIcon icon={faForwardStep} />,
      // previousWordArrowLeftPress: useKeyPress('ArrowLeft'),
      // nextWordArrowRightPress: useKeyPress('ArrowRight')
      index: 0,  //index which u want to display first
      direction: null, //direction of the carousel..u need to set it to either 'next' or 'prev' based on user click
      carouselItemCount: 3
      // nextIcon: <span className="glyphicon glyphicon-glass"></span>,
      // prevIcon: <span className="glyphicon glyphicon-glass"></span>
    }
  }

  // componentDidMount() {
  //   axios.get('http://localhost:5000/stories');
  // }

  // const carouselRef = React.useRef(null);

  // const playIcon = <FontAwesomeIcon icon={faPlay} />
  // const backwardIcon = <FontAwesomeIcon icon={faBackward} />
  // const forwardIcon = <FontAwesomeIcon icon={faForward} />
  // const backwardStepIcon = <FontAwesomeIcon icon={faBackwardStep} />
  // const forwardStepIcon = <FontAwesomeIcon icon={faForwardStep} />

  // const previousWordArrowLeftPress = useKeyPress('ArrowLeft');
  // const nextWordArrowRightPress = useKeyPress('ArrowRight');

  // onPrevPageClick = () => {
  //   carouselRef.current.prev();
  // };

  // onNextPageClick = () => {
  //   carouselRef.current.next();
  // };

  onPrevPageClick = () => {
    let direction = 'prev';
    let index = this.state.index
    const [min, max] = [0, this.state.carouselItemCount - 1]

    if (direction === 'prev') {
      index--
    }

    if (index > max) {
      // at max, start from top
      index = 0
    }

    if (index < min) {
      // at min, start from max
      index = max
    }
    this.setState({
      direction,
      index
    })
  };

  onNextPageClick = () => {
    let direction = 'next';
    let index = this.state.index
    const [min, max] = [0, this.state.carouselItemCount - 1]

    if (direction === 'next') {
      index++
    }

    if (index > max) {
      // at max, start from top
      index = 0
    }

    if (index < min) {
      // at min, start from max
      index = max
    }
    this.setState({
      direction,
      index
    })
  };

  previousPageTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="Krebbit-tooltip">
      Previous page
    </Tooltip>
  );

  previousWordTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="Krebbit-tooltip">
      Previous word
    </Tooltip>
  );

  playTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="Krebbit-tooltip">
      Play
    </Tooltip>
  );

  nextWordTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="Krebbit-tooltip">
      Next word
    </Tooltip>
  );

  nextPageTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="Krebbit-tooltip">
      Next page
    </Tooltip>
  );

  handleSelect = (selectedIndex, e) => {
    this.setState({
        index: selectedIndex,
        direction: e.direction
    });
  }

  render() {
    return (
      <div>
        <Container className="Story-page-wrapper">
          <Row>
            <Col sm={1}></Col>
            <Col sm={10}>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 100 }}
              overlay={this.previousPageTooltip}
            >
              <Button onClick={this.onPrevPageClick} className="Story-player Story-player-previous-page">{this.state.backwardStepIcon}</Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 100 }}
              overlay={this.previousWordTooltip}
            >
              <Button className="Story-player Story-player-previous-word">{this.state.backwardIcon}</Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 100 }}
              overlay={this.playTooltip}
            >
              <Button className="Story-player Story-player-play">{this.state.playIcon}</Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 100 }}
              overlay={this.nextWordTooltip}
            >
              <Button className="Story-player Story-player-next-word">{this.state.forwardIcon}</Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 100 }}
              overlay={this.nextPageTooltip}
            >
              <Button onClick={this.onNextPageClick} className="Story-player Story-player-next-page">{this.state.forwardStepIcon}</Button>
            </OverlayTrigger>
            </Col>
            <Col sm={1}>{this.previousWordArrowLeftPress && "left"}{this.nextWordArrowRightPress && "right"}</Col>
          </Row>
          <Row>
          <Col></Col>
          </Row>
          <Row>
            <Col>
              {/* <Carousel interval={null} variant="dark" fade ref={this.carouselRef}> */}
              <Carousel interval={null} variant="dark" fade activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
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