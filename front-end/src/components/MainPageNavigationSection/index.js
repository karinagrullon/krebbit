import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import StoryCard from '../StoryCard';

function MainPageNavigationSection() {
    return (
        <Container className="Main-stories-navigation">
            <Row>
                <Col sm={12}><div className="Main-stories-navigation-title"><a id="age"></a>Age</div></Col>
            </Row>
            <Row>
                <Col sm><a href="#" className="Main-stories-navigation-link">Age 0-3</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Age 4-6</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Age 7-12</a></Col>
            </Row>
            <Row>
                <Col sm={12}><div className="Main-stories-navigation-title"><a id="lenght">Lenght</a></div></Col>
            </Row>
            <Row>
                <Col sm><a href="#" className="Main-stories-navigation-link">5 Mins Stories</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">10 Mins Stories</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">20+ Mins Stories</a></Col>
            </Row>
            <Row>
                <Col sm={12}><div className="Main-stories-navigation-title"><a id="topic">Topic</a></div></Col>
            </Row>
            <Row>
                <Col sm><a href="#" className="Main-stories-navigation-link">Adventure</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Bedtime</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Dogs</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Family</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Friends</a></Col>
            </Row>
            <Row md>
                <Col sm><a href="#" className="Main-stories-navigation-link">Animals</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Chrismas</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Dragons</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Fiction</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Halloween</a></Col>
            </Row>
            <Row md>
                <Col sm><a href="#" className="Main-stories-navigation-link">Art</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Dinasours</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Fairy Tales</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Food</a></Col>
                <Col sm><a href="#" className="Main-stories-navigation-link">Monsters</a></Col>
            </Row>
        </Container>
    );
}
  
export default MainPageNavigationSection;