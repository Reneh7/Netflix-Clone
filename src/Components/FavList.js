import React, { useState, useEffect } from "react";
import { Card, Button, Col, Container,Form } from "react-bootstrap";

export default function FavList() {
  const [favMovies, setFavMovies] = useState([]);
  const [updateComment, setUpdateComment] = useState("");
  console.log(updateComment)

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const url = process.env.REACT_APP_MOVIES_URL;
        const response = await fetch(`${url}/getMovies`);

        if (response.ok) {
          const data = await response.json();
          setFavMovies(data);
        } else {
          console.log("Failed to retrieve favorite movies");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchFavoriteMovies();
  }, []);

  const handleDeleteMovie = async (movieId) => {
    try {
      const url = process.env.REACT_APP_MOVIES_URL;
      const response = await fetch(`${url}/DELETE/${movieId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFavMovies(favMovies.filter((movie) => movie.id !== movieId));
        console.log("Movie deleted from favorites");
      } else {
        console.log("Failed to delete movie from favorites");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleUpdateComment = async (movieId) => {
    try {
      const movieToUpdate = favMovies.find((movie) => movie.id === movieId);
      const updatedMovie = { ...movieToUpdate, comment: updateComment };
      
      const url = process.env.REACT_APP_MOVIES_URL;
      const response = await fetch(`${url}/UPDATE/${movieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      });
  
      if (response.ok) {
        setFavMovies((prevMovies) =>
          prevMovies.map((movie) => {
            if (movie.id === movieId) {
              return updatedMovie;
            }
            return movie;
          })
        );
        console.log("Comment updated for the movie");
        setUpdateComment(""); 
      } else {
        console.log("Failed to update comment for the movie");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleUpdateCommentChange = (event) => {
    setUpdateComment(event.target.value);
  };
  return (
    <Container>
      <h2>Favorite Movies</h2>
      <div className="fav-movies-container">
        {favMovies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>
                  {movie.title} ({movie.release_date})
                </Card.Title>
                <Card.Img variant="top" src={movie.image}  className="card-img-top" />
                <Card.Text>{movie.comment}</Card.Text>
                <div>
                  <Button variant="danger" onClick={() => handleDeleteMovie(movie.id)}>
                    Delete
                  </Button>
                  <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateComment(movie.id);
                  }}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Enter a new comment"
                        value={updateComment}
                        onChange={handleUpdateCommentChange}
                      />
                    </Form.Group>
                  <Button variant="primary" type="submit">
                    Update
                  </Button>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </Container>
  );
}
