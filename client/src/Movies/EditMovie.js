import React, { useState, useEffect } from "react";
import axios from "axios";

const EditMovieCard = props => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: 0,
    stars: []
  });

  const id = props.match.params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .then(res => console.log("cj: movie get", res.data))
      .catch(err => console.log("cj: movie get error", err));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log("cj:movie submit", res);
        setMovie(res.data);
        props.history.push(`/movies/${movie.id}`);
      })
      .catch(err => {
        console.log("cj:movie submit error", err);
      });
  };

  const handleChange = e => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="movie-card">
      <h1>Edit Movie Card</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="movie title"
          value={movie.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder="director"
          value={movie.director}
          onChange={handleChange}
        />
        <input
          type="text"
          name="metascore"
          placeholder="metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        <input
          type="text"
          name="stars"
          placeholder="movie stars"
          value={movie.stars}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default EditMovieCard;
