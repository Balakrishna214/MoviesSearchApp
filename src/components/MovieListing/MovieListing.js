import React from 'react';
import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import './MovieListing.scss';
import Slider from "react-slick";
import { settings } from '../../common/settings';
  


const MovieListing = () => {
  
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
   

  const moviesRender = movies.Response === "True" ? (
    movies.Search.map((movie, index) => (
      <MovieCard key={index} data={movie} />
    ))
  ) : (
    <div className='movies-error'><h3>{movies.Error}</h3></div>
  );

  const showsRender = shows.Response === "True" ? (
    shows.Search.map((show, index) => (
      <MovieCard key={index} data={show} />
    ))
  ) : (
    <div className='movies-error'><h3>{shows.Error}</h3></div>
  );

  return (
    <div className='movies-wrapper'>
      <div className='movie-list'>
        <h2>Movies</h2>
       <div className='movie-container'>
         

        <Slider {...settings}>{moviesRender}</Slider> 
      
        </div>
      </div>
      <div className='movie-list'>
        <h2>Shows</h2>
        <div className='movie-container'>
         

        <Slider {...settings}>{showsRender}</Slider> 
        
        </div>
        </div>
    </div>
  );
};
 
export default MovieListing;
