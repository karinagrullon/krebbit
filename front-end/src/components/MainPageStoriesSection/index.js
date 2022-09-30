import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import StoryCard from '../StoryCard';

function MainPageStoriesSection() {
    return (
        <Container fluid className="Main-stories-section">
            <Row>
                <Col sm={12}><div className="Main-stories-section-title">Featured</div></Col>
            </Row>
            <Row>
                <Col><StoryCard /></Col>
                <Col><StoryCard /></Col>
                <Col><StoryCard /></Col>
                <Col><StoryCard /></Col>
            </Row>
            <Row>
                <Col sm={12}><div className="Main-stories-section-title">Latest Stories</div></Col>
            </Row>
            <Row>
                <Col><StoryCard /></Col>
                <Col><StoryCard /></Col>
                <Col><StoryCard /></Col>
                <Col><StoryCard /></Col>
            </Row>
        </Container>
    );
}
  
export default MainPageStoriesSection;