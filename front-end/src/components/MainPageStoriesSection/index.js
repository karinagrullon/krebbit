import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import StoryCard from '../StoryCard';

function MainPageStoriesSection(props) {
        return (
            <div>
                <Container fluid className="Main-stories-section">
                    <Row>
                        <Col sm={12}><div className="Main-stories-section-title">Featured</div></Col>
                    </Row>
                    <Row>
                    {(typeof props.storiesData.stories === 'undefined') ? (
                    <p>Loading...</p>
                    ) : (
                        props.storiesData.stories.map(story => (
                        <Col><StoryCard storyData={story} /></Col>
                        ))
                        )}
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
            </div>
        );
    }
  
export default MainPageStoriesSection;