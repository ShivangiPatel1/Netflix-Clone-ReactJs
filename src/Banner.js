import React,{useState,useEffect} from 'react'
import requests from './requests';
import axios from "./axios";
import "./banner.css";
const baseURL = "https://image.tmdb.org/t/p/original/"

function Banner() {

    const [movie,setMovie] = useState([]);

    useEffect(()=>{
        async function fetchData(){
const request = await axios.get(requests.fetchNetflixOriginals);
setMovie(request.data.results[Math.floor(Math.random()*request.data.results.length-1)]);


return request;

        }
        fetchData()
    },[]);

    function truncate(str,n){
        return str?.length>n ? str.substr(0,n-1)+"...":str;
    }
    return (
     <header className="banner"
     style={{
         backgroundSize:"cover",
         backgroundImage:`url(${baseURL}${movie?.backdrop_path})`, 
         backgroundPosition:"center center"
     }}>
      {/*background image*/}
     <div className="banner_contents">

  
        {/* title */}
        <h1 className="banner_title">
        {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/*buttons play/mylist */}
        <div className="banner_buttons">
        <button className="banner_button">Play</button>
        <button className="banner_button">My List</button>
        </div>
        {/*description */}
        <h1 className="banner_description">
           {truncate(movie?.overview,150)}
        </h1>
     </div>
     <div className="banner_fadeBottom"></div>
     
     </header>
    )
}

export default Banner
