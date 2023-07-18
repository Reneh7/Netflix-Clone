import React from 'react';
import Movie from './Movie';
import { Row } from 'react-bootstrap';

export default function MovieList({ data }) {
    return (
      <Row className="g-4">
        {data.map((movie) => (
          <Movie key={movie.id} movie={movie}  />
        ))}
      </Row>
  );
}

