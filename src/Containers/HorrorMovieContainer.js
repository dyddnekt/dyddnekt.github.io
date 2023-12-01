import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getHorror } from '../modules/movie';
import MovieListSlider from 'movie/MovieListSlider';
import MovieList from 'movie/MovieList';

const HorrorMovieContainer = () => {
    const horrorData = useSelector(state => state.horror.movies,[]) || [];
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getHorror());
    }, [dispatch]);

    return (
        <>
            <h3>Horror Movie</h3>
            <MovieList>
                { horrorData.results && horrorData.results.map(movie => ( 
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

export default HorrorMovieContainer;