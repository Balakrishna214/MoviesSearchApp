import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchAsyncMoviesOrShows,getSelectMoviesOrShows, removeSelectedMovieOrShow } from '../../features/movies/movieSlice'
import './MovieDetail.scss'
import { FaStar } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";




const MovieDetail=()=>{
     
    const {imdbID}=useParams();
    console.log("id");
    
     console.log(imdbID);
     
    
    const dispatch=useDispatch();
    const data=useSelector(getSelectMoviesOrShows)
    useEffect(()=>{
        dispatch(fetchAsyncMoviesOrShows(imdbID))
        return ()=>{
            dispatch(removeSelectedMovieOrShow);
        }
    },[dispatch,imdbID])
    console.log(data);
    const {Title,imdbRating,imdbVotes,Runtime,Year,Plot,Director,Actors,Genre,Language,Awards,Poster}=data
    return(
        <div className='movie-section'>
            {Object.keys(data).length===0?(<div>
                ...Loading
            </div>):
           ( <>
            <div className='section-left'>
                <div className='movie-title'>
                    {Title}
                </div>
                <div className='movie-rating'>
                    <span>IMDB Rating <FaStar className='icon star'/>: {imdbRating} </span>
                    <span>IMDB Votes  <FaThumbsUp className='icon thumbsUp'/> : {imdbVotes} </span>
                    <span>Run time  <FaFilm className='icon runtime'/> : {Runtime} </span>
                    <span>Year  <CiCalendar className='icon year'/> : {Year} </span>  
                </div>
                <div className='movie-plot'>
                    {Plot}
                </div>
                <div className='movie-info'>
                    <div>
                        <span>Director</span>
                        <span>{Director}</span>
                    </div>
                    <div>
                        <span>Stars</span>
                        <span>{Actors}</span>
                    </div>
                    <div>
                        <span>Languages</span>
                        <span>{Language}</span>
                    </div>
                    <div>
                        <span>Genres</span>
                        <span>{Genre}</span>
                    </div>
                    <div>
                        <span>Awards</span>
                        <span>{Awards}</span>
                    </div>
                </div>
            
            </div>
            <div className='section-right'>
                <img src={Poster} alt={Title} />
            </div>
            </>)}
        </div>
    )

}


export default MovieDetail