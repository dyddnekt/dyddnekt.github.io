import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAnimation } from '../modules/movie';
import MovieListSlider from 'movie/MovieListSlider';
import MovieList from 'movie/MovieList';

const AnimationMovieContainer = () => {
    const animationData = useSelector(state => state.animation.movies,[]) || [];
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAnimation());
    }, [dispatch]);
    
    return (
        <>
            <h3>Animation Movie</h3>
            <MovieList>
                { animationData.results && animationData.results.map(movie => ( 
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

export default AnimationMovieContainer;