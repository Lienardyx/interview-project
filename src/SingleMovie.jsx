import { useState } from "react";
import { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom"
import { API_URL } from "./Context"


const SingleMovie = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");


  const getMovies = async (url) => {
    setIsLoading(true);
      try{
          const res = await fetch(url);
          const data = await res.json();
          console.log(data);
          if(data.Response == "True"){
              setIsLoading(false);
              setMovie(data);
          }
      }catch(error){
          console.log(error);
      }
  }

  useEffect(() => {
      const timesOut = setTimeout(() => {
          getMovies(`${API_URL}&i=${id}`);
      }, 800);
      
      return () => clearTimeout(timesOut)
  }, [id])

  if(isLoading){
    return (
      <div className="movie-section">
          <div className="loading">Loading...</div>
      </div>
    )
  }
  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>

        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">Release: {movie.Released}</p>
          <p className="card-text">Genre: {movie.Genre}</p>
          <p className="card-text">Rating: {movie.imdbRating} / 10</p>
          <p className="card-text">Region: {movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default SingleMovie