import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRomance } from '../modules/movie';
import MovieListSlider from 'movie/MovieListSlider';
import MovieList from 'movie/MovieList';

const RomanceMovieContainer = () => {
    const romanceData = useSelector(state => state.romance.movies,[]) || [];
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getRomance());
    }, [dispatch]);

    return (
        <>
            <h3>Romance Movie</h3>
            <MovieList>
                { romanceData.results && romanceData.results.map(movie => ( 
                    <MovieListSlider 
                        key={movie.id}
                        id={movie.id}
                        title={movie.title} 
                        average={movie.vote_average} 
                        overview={movie.overview} 
                        poster={movie.poster_path} 
                        date={movie.release_date} 
                        backImg={movie.backdrop_path} 
                    /> 
                ))}
            </MovieList>
        </>
    );
}

export default RomanceMovieContainer;