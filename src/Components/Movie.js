import React, { useState } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import ModalMovie from './ModalMovie';

export default function Movie(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const imageURL = `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`;


  return (
    <Col xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card className="h-100">
        <Card.Img variant="top" src={imageURL}  className="card-img-top" />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>{props.movie.title} ({props.movie.release_date})</Card.Title>
          <div>
            <Button onClick={handleShow} variant="primary">
              Add To Favorite
            </Button>
          </div>
        </Card.Body>
      </Card>
      <ModalMovie
        modalData={props.movie}
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
    </Col>
  );
}

