import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import StoryCardThumbnail from '../../images/thumbnails/elephant.png';

function readingTime(storyDataFromProps) {
  const text = (typeof storyDataFromProps.storyData === 'undefined') ? 'Loading...' : storyDataFromProps.storyData.body;
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}

function StoryCard(props) {
  return (
    <Card style={{ width: '18rem' }} className="stories-card">
      <Card.Img variant="top" src= { StoryCardThumbnail } />
      <Card.Body>
        <Card.Title>{(typeof props.storyData === 'undefined') ? 'Loading...' : props.storyData.title}</Card.Title>
        <div className="stories-card-tag-wrapper">
            {(typeof props.storyData === 'undefined') ? 'Loading...' : props.storyData.ages.map((age) =>
              <Button variant="outline-secondary" size="sm" className="stories-card-tag" key={`${props.storyData.id}${age}`}>{age}</Button>
            )}
            
            <Button variant="outline-secondary" size="sm" className="stories-card-tag" >{`${readingTime(props)} MINS STORIES`}</Button>

            {(typeof props.storyData === 'undefined') ? 'Loading...' : props.storyData.topics.map((topic) =>
              <Button variant="outline-secondary" size="sm" className="stories-card-tag" key={`${props.storyData.id}${topic}`}>{topic}</Button>
            )}
        </div>
        <Card.Text>
          <div className="Fixed-div-lenght">
          {(typeof props.storyData === 'undefined') ? 'Loading...' : props.storyData.summary}
          </div>
        </Card.Text>
        <Button className="stories-card-button">Read</Button>
      </Card.Body>
    </Card>
  );
}

export default StoryCard;