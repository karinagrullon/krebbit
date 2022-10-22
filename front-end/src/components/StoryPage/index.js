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
import { faRepeat } from '@fortawesome/free-solid-svg-icons'

import StoryCardError from '../../images/error-images/image-not-found.jpg';

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
      repeatIcon: <FontAwesomeIcon icon={faRepeat} />,
      // previousWordArrowLeftPress: useKeyPress('ArrowLeft'),
      // nextWordArrowRightPress: useKeyPress('ArrowRight')
      index: 0,  //index to display first
      direction: null, //direction of the carousel prev or next
      carouselItemCount: 0,
      storyImagesCount: 0,
      storyId: null,
      title: null,
      subtitle: null,
      authors: [],
      publishedDate: null,
      publisher: null,
      ages: [],
      topics: [],
      imagesLinks: null,
      summary: null,
      body: null,
      storyParagraphs: []
    }
  }

  getStories = () => {
    axios.get('/stories')
    .then(response => {
      this.setState({
        stories: response.data
      })
      const id = this.getIdFromURL();
      const base = response.data.stories;

      this.setState({
        storyId: base[id].id,
        title: base[id].title,
        subtitle: base[id].subtitle,
        publisher: base[id].publisher,
        authors: base[id].authors,
        imagesLinks: base[id].imagesLinks,
        body: base[id].body,
        storyParagraphs: (this.state.body === null) ? this.state.body : this.state.body.match(/[^.]+.[^.]+./g),
        carouselItemCount: (this.state.body === null) ? this.state.body : this.state.body.match(/[^.]+.[^.]+./g).length + 2,
        storyImagesCount: base[id].imagesLinks.storyImagesUrls.length
      })
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
    console.log(this.state.stories);
    console.log(this.state.storyId);
    console.log(this.state.title);
    console.log(this.state.subtitle);
    console.log(this.state.authors);
    const imgLinks = this.state.imagesLinks;
    //console.log(imgLinks.thumbnailUrl);
    console.log((this.state.imagesLinks === null) ? 'Loading...' : imgLinks.storyImagesUrls);
    console.log((this.state.imagesLinks === null) ? 'Loading...' : imgLinks.thumbnailUrl);
    console.log(this.state.body);

    //const storyParagraphs = (this.state.body === null) ? this.state.body : this.state.body.split("\\n");
    //console.log((storyParagraphs === null) ? 0 : storyParagraphs.length);
    console.log(this.state.storyParagraphs);

    // console.log((this.state.carouselItemCount === 0) ? 0 : this.state.imagesLinks.storyImagesUrls.lenght);
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
              <div class="Carousel-wrapper">
                <Carousel interval={null} variant="dark" activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}> 
                  {/* {(this.state.imagesLinks === null) ? StoryCardError : imgLinks.storyImagesUrls.map((image) => */}
                  <Carousel.Item>
                  <Container>
                    <Row>
                      <Col sm="4"></Col>
                      <Col sm="4">
                    <div className="Story-cover-image-wrapper">
                      <img
                        className="d-block w-100"
                        src={require(`../../images/stories/${(this.state.imagesLinks === null) ? 'error-images/image-not-found.jpg' : imgLinks.thumbnailUrl}`)}
                        alt="First slide"
                        key = {`${this.state.storyId}`}
                      />
                    
                      <Carousel.Caption className="Story-cover-text-wrapper">
                        <h3 className="Story-cover-title">{(this.state.title === null) ? "Loading..." : this.state.title}</h3>
                        {(this.state.authors === []) ? [] : this.state.authors.map((autor) => 
                            <p>{autor}</p>
                        )}
                        <div className="Story-cover-text-publisher">{(this.state.publisher === null ? 'Loading...' : this.state.publisher)}</div>
                      </Carousel.Caption>
                    </div>
                    </Col>
                    <Col sm="4"></Col>
                    </Row>
                    </Container>
                    </Carousel.Item>
                  {(this.state.storyParagraphs === null) ? [] : this.state.storyParagraphs.map((story) =>
                    <Carousel.Item>
                      <Container>
                        <Row>
                          <Col sm="4">
                            <div className="Story-image-wrapper">
                            {/* {(this.state.imagesLinks === null) ? StoryCardError : imgLinks.storyImagesUrls.map((image) => */}
                              <img
                                className="d-block w-100"
                                src={require(`../../images/stories/0/story-images/puss-in-boots-1.png`) }
                                alt="First slide"
                                key = {`${this.state.storyId}`}
                              />
                            {/* )} */}
                            </div>
                          </Col>
                          <Col sm="8">
                          <Carousel.Caption className="Story-text-wrapper">
                            <h3></h3>
                            <div className="Story-text-title-wrapper">{(this.state.title === null) ? "Loading..." : this.state.title}</div>
                            <p>{story}</p>
                          </Carousel.Caption>
                          </Col>
                        </Row>
                      </Container>
                    </Carousel.Item>
                  )}
                  <Carousel.Item>
                  <Container>
                    <Row>
                      <Col>
                      <div className="Story-end-wrapper">
                        The End
                      </div>
                      <div className="Story-repeat-icon">
                          {this.state.repeatIcon}
                        </div>
                      </Col>
                    </Row>
                    </Container>
                    </Carousel.Item>
                </Carousel>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default StoryPage;