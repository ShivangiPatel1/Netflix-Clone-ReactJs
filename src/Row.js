import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer"

const baseURL = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl ,isLargeRow}) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl , setTrailerUrl] = useState("");

  useEffect(() => {

    //when []is empty the block ofcode runs only once
    //whem [fetcURL] or [movies] block of code runs everytime it is updated.
    async function fetchData() {
      const request = await axios.get(fetchUrl);
     setMovies(request.data.results);
     return request;
    }
    fetchData();
  }, [fetchUrl]);
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleClick=(movie)=>{

    if(trailerUrl){
        setTrailerUrl("");
    }
    else {
        movieTrailer(movie?.name || "").then((url)=>{
            const urlParams = new URLSearchParams (new URL(url).search);
            setTrailerUrl(urlParams.get('v'));

        }).catch((error)=>console.log(error))
    }

  }
// always mention here the varibale tha is out side the block to let know use effect that u are using varibale that is outside the block and u need to update when it changes
  return (
    <div className="row">
      <h2>{title}</h2>
    <div className="row_posters">

    {movies.map(movie =>(
        <img 
        onClick ={()=>handleClick(movie)}
        key={movie.id}
        src={`${baseURL}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
        alt={movie.name} 
        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
        ></img>
    ))}
    </div>
    {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
}

export default Row;
