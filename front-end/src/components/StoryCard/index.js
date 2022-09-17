import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import StoryCardThumbnail from '../../images/thumbnails/elephant.png';

function StoryCard() {
  return (
    <Card style={{ width: '18rem' }} className="stories-card">
      <Card.Img variant="top" src= { StoryCardThumbnail } />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <div className="stories-card-tag-wrapper">
            <Button variant="outline-secondary" size="sm" className="stories-card-tag">AGE 0-3</Button>{' '}
            <Button variant="outline-secondary" size="sm" className="stories-card-tag">5 MINS STORIES</Button>{' '}
            <Button variant="outline-secondary" size="sm" className="stories-card-tag">ANIMALS</Button>{' '}
        </div>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default StoryCard;