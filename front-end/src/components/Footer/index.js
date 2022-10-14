import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
    return (
        <div className="footer-div">
            <Container>
                <Row>
                    <Col><hr className="footer-hr"/></Col>
                </Row>
                <Row>
                    <Col>&copy; 2022 KREBBIT</Col>
                </Row>
            </Container>
        </div>
    );
}
  
export default Footer;