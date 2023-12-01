import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getComedy } from '../modules/movie';
import MovieListSlider from 'movie/MovieListSlider';
import MovieList from 'movie/MovieList';

const ComedyMovieContainer = () => {
    const comedyData = useSelector(state => state.comedy.movies,[]) || [];
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getComedy());
    }, [dispatch]);

    return (
        <>
            <h3>Comedy Movie</h3>
            <MovieList>
                { comedyData.results && comedyData.results.map(movie => ( 
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

export default ComedyMovieContainer;