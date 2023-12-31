import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import FavList from "./FavList";

export default function ModalMovie({ handleShow, handleClose, show, modalData }) {
  const [comment, setComment] = useState("");
  const [showFavList, setShowFavList] = useState(false);
  const truncatedOverview = modalData.overview.substring(0, 200);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      const movieData = {
        t: modalData.title,
        y: parseInt(modalData.release_date),
        o: truncatedOverview,
        c: comment,
      };

      const url = process.env.REACT_APP_MOVIES_URL;
      const response = await fetch(`${url}/addMovie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        console.log("Comment added:", movieData);
        setComment("");
      } else {
        console.log("Failed to add comment");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAddToFavorite = async () => {
    try {
      const movieData = {
        t: modalData.title,
        y: parseInt(modalData.release_date),
        o: truncatedOverview,
        c: comment,
      };

      const url = process.env.REACT_APP_MOVIES_URL;
      const response = await fetch(`${url}/addMovie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        console.log("Movie added to favorites:", movieData);
        setShowFavList(true);
      } else {
        console.log("Failed to add movie to favorites");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleCommentUpdate = (updatedComment) => {
    setComment(updatedComment);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalData.title} {modalData.release_date}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalData.overview}</p>
          <Form.Group>
            <Form.Label>Add a Comment:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter comment"
              value={comment}
              onChange={handleCommentChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onSubmit={handleAddToFavorite} onClick={handleAddComment}>
              Add To Favourite
            </Button>
        </Modal.Footer>
      </Modal>
      {showFavList && <FavList updateComment={comment}  />}
    </div>
  );
}