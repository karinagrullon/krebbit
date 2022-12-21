import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleCarry, faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

import { useSpeechSynthesis } from "react-speech-kit";

const splitText = (text, from, to) => [
  text.slice(0, from),
  text.slice(from, to),
  text.slice(to),
];

const HighlightedText = ({ text, from, to }) => {
  const [start, highlight, finish] = splitText(text, from, to);
  return (
    <p>
      {start}
      <span style={{ backgroundColor: "#fee44f" }}>{highlight}</span>
      {finish}
    </p>
  );
};

const StoryPage = () => {
  const [stories, setStories] = useState([{}]);
  const [base, setBase] = useState([{}]);
  const [storyId, setStoryId] = useState(null);
  const [title, setTitle] = useState(null);
  const [subtitle, setSubtitle] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [imagesLinks, setImagesLinks] = useState(null);
  const [body, setBody] = useState(null);
  const [storyParagraphs, setStoryParagraphs] = useState([]);
  const [carouselItemCount, setCarouselItemCount] = useState(0);
  const [storyImagesCount, setStoryImagesCount] = useState(0);
  const [previousUrl, setPreviousUrl] = useState("");

  const backwardIcon = useState(<FontAwesomeIcon icon={faBackward} />);
  const forwardIcon = useState(<FontAwesomeIcon icon={faForward} />);
  const backwardStepIcon = useState(<FontAwesomeIcon icon={faBackwardStep} />);
  const forwardStepIcon = useState(<FontAwesomeIcon icon={faForwardStep} />);
  const repeatIcon = useState(<FontAwesomeIcon icon={faRepeat} />);
  const cancelIcon = useState(<FontAwesomeIcon icon={faCancel} />);
  const volumeIcon = useState(<FontAwesomeIcon icon={faVolumeUp} />);
  const [playPauseToggleIcon, setPlayPauseToggleIcon] = useState(
    <FontAwesomeIcon icon={faPlay} />
  );
  const [playPauseToggleTooltip, setPlayPauseToggleTooltip] = useState("Play");

  const [speechRecogBrowserComp, setSpeechRecogBrowserComp] = useState(false);

  const carouselRef = React.useRef(null);

  const previousWordArrowUpPress = useKeyPress("ArrowUp");
  const nextWordArrowDownPress = useKeyPress("ArrowDown");
  const previousPageArrowLeftPress = useKeyPress("ArrowLeft");
  const nextPageArrowRightPress = useKeyPress("ArrowRight");

  const [selectedText, setSelectedText] = useState('');

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const [highlightSection, setHighlightSection] = React.useState({
    from: 0,
    to: 0,
  });


const onEnd = () => {
  setSelectedText('')
}
const { speak, cancel, supported } = useSpeechSynthesis({onEnd})

const handleTextSet = () => {
  const text = window.getSelection().toString()
  console.log(text);
  if(text !== '') setSelectedText(text)
}

// setting selectedText state when text has been highlighted
useEffect(() => {
  document.addEventListener('mouseup', handleTextSet)
  return () => {
    document.removeEventListener('mouseup', handleTextSet)
  }
}, [])


  const handlePlayClick = () => {
    const synth = window.speechSynthesis;

    if (!synth) {
      console.error("no tts");
      alert("No SpeechSynthesis supported!");
      return;
    }

    if (synth.speaking || !synth.paused) {
      synth.pause();
      setPlayPauseToggleIcon(<FontAwesomeIcon icon={faPlay} />);
      setPlayPauseToggleTooltip("Play");
    }

    if (synth.paused) {
      synth.resume();
      setPlayPauseToggleIcon(<FontAwesomeIcon icon={faPause} />);
      setPlayPauseToggleTooltip("Pause");
    }

    console.log(synth.speaking);
    console.log(previousUrl);
    console.log(window.location.pathname + getIdFromURL());
    if (
      synth.speaking &&
      previousUrl !== window.location.pathname + getIdFromURL()
    ) {
      synth.cancel();
    }

    let utteranceTitle = new SpeechSynthesisUtterance(title);

    utteranceTitle.lang = "en-US";
    utteranceTitle.rate = 0.7;

    utteranceTitle.addEventListener("end", () => {
      if (!synth.speaking || !synth.paused) {
        onNextPageClick();
      }
    });

    synth.speak(utteranceTitle);

    for (let i = 0; i < storyParagraphs.length - 1; i++) {
      let utterance = new SpeechSynthesisUtterance(storyParagraphs[i]);

      utterance.voiceURI = "native";
      utterance.lang = "en-US";
      utterance.rate = 0.6;

      utterance.addEventListener("boundary", (event) => {
        const { charIndex, charLength } = event;
        setHighlightSection({ from: charIndex, to: charIndex + charLength });
      });

      synth.speak(utterance);

      utterance.addEventListener("end", () => {
        if (!synth.speaking || !synth.paused) {
          onNextPageClick();
        }
        if (i === storyParagraphs.length - 1) {
          synth.cancel();
        }
      });
    }
    setPreviousUrl(window.location.pathname + getIdFromURL());
  };

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const SpeechRecognitionEvent = window.SpeechRecognitionEvent;

 // setSpeechRecogBrowserComp("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  console.log(storyParagraphs);

  let recognition = {};

  console.log(speechRecogBrowserComp);

  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    recognition = new SpeechRecognition();

    let storyWords = [];

    if (
      storyParagraphs.length !== 0 &&
      storyParagraphs !== "undefined" &&
      SpeechGrammarList
    ) {
      storyWords = storyParagraphs[0].split(" ");

      const grammar = `#JSGF V1.0; grammar colors; public <color> = ${storyWords.join(
        " | "
      )};`;

      const speechRecognitionList = new SpeechGrammarList();

      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    }

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
      // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
      // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
      // It has a getter so it can be accessed like an array
      // The first [0] returns the SpeechRecognitionResult at the last position.
      // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
      // These also have getters so they can be accessed like arrays.
      // The second [0] returns the SpeechRecognitionAlternative at position 0.
      // We then return the transcript property of the SpeechRecognitionAlternative object
      var word = event.results[0][0].transcript;
      console.log(word);
      console.log("Confidence: " + event.results[0][0].confidence);
    };
  }
  const startSpeechRecognition = () => {
    if (isSwitchOn) {
      if (
        "SpeechRecognition" in window ||
        "webkitSpeechRecognition" in window
      ) {
        recognition.start();
      }
    }
  };

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    // similar to componentDidUpdate
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      startSpeechRecognition();
    }
  });

  recognition.onspeechend = () => {
    recognition.stop();
  };

  // recognition.onspeechend = new Promise(() => {
  //   recognition.stop();
  // }).then(recognition.start());

  const onPrevPageClick = () => {
    carouselRef.current.prev();
  };

  const onNextPageClick = () => {
    carouselRef.current.next();
  };

  const getIdFromURL = () => {
    let result = []; // []
    const stringArray = window.location.search.substring(1).split("&"); // ["id=number", "another=string"]

    stringArray.forEach((string) => {
      result.push(string.split("="));
    }); // [[id, number], [other, string], [another, string]

    result = Object.fromEntries(result); // {id: number, another: string}

    return result.storyId ?? 0; // number (or 0 if undefined)
  };

  const retrieveStories = () => {
    const id = getIdFromURL();

    fetch("/stories")
      .then((res) => res.json())
      .then((stories) => {
        setStories(stories);
        return stories;
      })
      .then((base) => {
        setBase(base);
        setStoryId(base.stories[id].id);
        setTitle(base.stories[id].title);
        setSubtitle(base.stories[id].subtitle);
        setPublisher(base.stories[id].publisher);
        setAuthors(base.stories[id].authors);
        setImagesLinks(base.stories[id].imagesLinks);
        setBody(base.stories[id].body);
        setStoryParagraphs(
          base.stories[id].body === null
            ? base.stories[id].body
            : base.stories[id].body.match(/[^.]+.[^.]+./g)
        );
        setCarouselItemCount(
          base.stories[id].body === null
            ? base.stories[id].body
            : base.stories[id].body.match(/[^.]+.[^.]+./g).length + 2
        );
        setStoryImagesCount(base.stories[id].imagesLinks.storyImages.length);
        return base;
      });
  };

  // if (typeof storyId !== 'undefined') {
  //   console.log(storyId);
  //   console.log(title);
  //   console.log(subtitle);
  //   console.log(publisher);
  //   console.log(authors);
  //   console.log(body);
  //   console.log(storyParagraphs);
  // }

  useEffect(() => {
    retrieveStories();
  }, []);

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
      {playPauseToggleTooltip}
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

  const handleStoryImage = (index) => {
    let imgUrl = null;
    imagesLinks.storyImages.map((image) =>
      image.range.includes(index) ? (imgUrl = image.url) : (imgUrl = imgUrl)
    );
    return imgUrl;
  };

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

  return (
    <div className="storyText">
      <Container className="Story-page-wrapper">
        <Row>
          <Col sm={3}>
          {supported && 
            <div className="speechMenu">
              {
                <Button className="Story-player Story-player-volume" onClick={() => speak({ text: selectedText})} disabled={selectedText !== "" ? false : true}>{volumeIcon}</Button>
              }
              {selectedText}
            </div>
          }
          </Col>
          <Col sm={6}>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 100 }}
              overlay={previousPageTooltip}
            >
              <Button
                className="Story-player Story-player-previous-page"
                onClick={onPrevPageClick}
              >
                {backwardStepIcon}
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 100 }}
              overlay={previousWordTooltip}
            >
              <Button className="Story-player Story-player-previous-word">
                {backwardIcon}
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 100 }}
              overlay={playTooltip}
            >
              <Button
                className="Story-player Story-player-play"
                onClick={handlePlayClick}
              >
                {playPauseToggleIcon}
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 100 }}
              overlay={nextWordTooltip}
            >
              <Button className="Story-player Story-player-next-word">
                {forwardIcon}
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 100 }}
              overlay={nextPageTooltip}
            >
              <Button
                className="Story-player Story-player-next-page"
                onClick={onNextPageClick}
              >
                {forwardStepIcon}
              </Button>
            </OverlayTrigger>
          </Col>
          <Col sm="3">
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                onChange={onSwitchAction}
                label="Student Read Mode"
                className="Student-read-mode"
                checked={isSwitchOn}
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            {previousWordArrowUpPress && "up"}
            {previousPageArrowLeftPress && "left"}
            {nextPageArrowRightPress && "right"}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="Carousel-wrapper">
              <Carousel interval={null} variant="dark" ref={carouselRef}>
                <Carousel.Item>
                  <Container>
                    <Row>
                      <Col sm="4"></Col>
                      <Col sm="4">
                        <div className="Story-cover-image-wrapper">
                          <img
                            className="d-block w-100"
                            src={require(`../../images/stories/${
                              imagesLinks === null
                                ? "error-images/image-not-found.jpg"
                                : imagesLinks.thumbnailUrl
                            }`)}
                            alt="First slide"
                            key={`${storyId}`}
                          />
                          <Carousel.Caption className="Story-cover-text-wrapper">
                            <h3 className="Story-cover-title">
                              {title === null ? "Loading..." : title}
                            </h3>
                            {authors === []
                              ? []
                              : authors.map((autor) => <p>{autor}</p>)}
                            <div className="Story-cover-text-publisher">
                              {publisher === null ? "Loading..." : publisher}
                            </div>
                          </Carousel.Caption>
                        </div>
                      </Col>
                      <Col sm="4"></Col>
                    </Row>
                  </Container>
                </Carousel.Item>
                {storyParagraphs === null
                  ? []
                  : storyParagraphs.map((story, index) => (
                      <Carousel.Item>
                        <Container>
                          <Row>
                            <Col sm="4">
                              <div className="Story-image-wrapper">
                                <img
                                  className="d-block w-100"
                                  src={
                                    handleStoryImage(index) === null ||
                                    handleStoryImage(index) === "undefined"
                                      ? require("../../images/stories/error-images/image-not-found.jpg")
                                      : require(`../../images/stories/${handleStoryImage(
                                          index
                                        )}`)
                                  }
                                  alt="First slide"
                                  key={`${storyId}`}
                                />
                              </div>
                            </Col>
                            <Col sm="8">
                              <Carousel.Caption className="Story-text-wrapper">
                                <h3></h3>
                                <div className="Story-text-title-wrapper">
                                  {title === null ? "Loading..." : title}
                                </div>
                                <HighlightedText
                                  key={index}
                                  text={story}
                                  {...highlightSection}
                                />
                              </Carousel.Caption>
                            </Col>
                          </Row>
                        </Container>
                      </Carousel.Item>
                    ))}
                <Carousel.Item>
                  <Container>
                    <Row>
                      <Col>
                        <div className="Story-end-wrapper">The End</div>
                        <div className="Story-repeat-icon">{repeatIcon}</div>
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
};

export default StoryPage;
