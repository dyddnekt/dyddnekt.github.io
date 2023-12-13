import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAction } from '../modules/movie';
import MovieListSlider from '../movie/MovieListSlider';
import MovieList from '../movie/MovieList';

const ActionMovieContainer = () => {
    const actionData = useSelector(state => state.action.movies,[]) || [];
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAction());
    }, [dispatch]);
    return (
        <>
            <h3>Action Movie</h3>
            <MovieList>
                { actionData.results && actionData.results.map(movie => (
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
    )
}

export default ActionMovieContainer;