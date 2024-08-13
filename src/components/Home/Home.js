import React, { useEffect } from 'react';
import MovieListing from '../MovieListing/MovieListing';
import { Puff } from 'react-loader-spinner';
import { getIsLoading, fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Home.scss';

const Home = () => {
    const isLoading = useSelector(getIsLoading);
    const dispatch = useDispatch();
    const movieText = "Harry";
    const showText = "Harry";

    useEffect(() => {
        dispatch(fetchAsyncMovies(movieText));
        dispatch(fetchAsyncShows(showText));
    }, [dispatch, movieText, showText]);

    return (
        <div className='home-container'>
            <div className='banner-image'></div>
            {isLoading ? (
                <div className='loader'>
                    <Puff
                        visible={true}
                        height="80"
                        width="80"
                        color="#ffff"
                        ariaLabel="puff-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            ) : (
                <MovieListing />
            )}
        </div>
    );
};

export default Home;
