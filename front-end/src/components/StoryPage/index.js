import React, { Component } from 'react';
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
      playIcon: <FontAwesomeIcon icon={faPlay} />,
      backwardIcon: <FontAwesomeIcon icon={faBackward} />,
      forwardIcon: <FontAwesomeIcon icon={faForward} />,
      backwardStepIcon: <FontAwesomeIcon icon={faBackwardStep} />,
      forwardStepIcon: <FontAwesomeIcon icon={faForwardStep} />,
      // previousWordArrowLeftPress: useKeyPress('ArrowLeft'),
      // nextWordArrowRightPress: useKeyPress('ArrowRight')
      index: 0,  //index to display first
      direction: null, //direction of the carousel prev or next
      carouselItemCount: 3
    }
  }

  getStories = () => {
    axios.get('/stories')
    .then(response => {
      this.setState({
        stories: response.data
      })
      console.log(response.data);
      const id = this.getIdFromURL();
      const base = response.data.stories;
      console.log(base[id].title);
    })
    .catch(error => {
      console.log(error);
    });
  }

  getIdFromURL = () => {
    let result = []; // []
    const stringArray = window.location.search.substring(1).split("&"); // ["id=number", "another=string"]
  
    stringArray.forEach((string) => {
      result.push(string.split("="));
    }); // [[id, number], [other, string], [another, string]
  
    result = Object.fromEntries(result); // {id: number, another: string}

    return result.storyId ?? 0; // number (or 0 if undefined)
  }

  componentDidMount() {
    // let StoryURL = `/story-page?storyId=`;
    this.getStories();

    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.repeat) {
      return;
    }

    const { key } = event;

    if (key === "ArrowRight") {
      console.log("Right");
    } else if (key === "ArrowLeft") {
      console.log("Left");
    }
  }

  onPrevPageClick = () => {
    const direction = 'prev';
    let index = this.state.index
    const [min, max] = [0, this.state.carouselItemCount - 1]

    if (direction === 'prev') {
      index--
    }

    if (index > max) {
      index = 0
    }

    if (index < min) {
      index = max
    }
    this.setState({
      direction,
      index
    })
  };

  onNextPageClick = () => {
    const direction = 'next';
    let index = this.state.index
    const [min, max] = [0, this.state.carouselItemCount - 1]

    if (direction === 'next') {
      index++
    }

    if (index > max) {
      index = 0
    }

    if (index < min) {
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
          </Row>
          <Row>
          <Col></Col>
          </Row>
          <Row>
            <Col>
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

export default StoryPage;