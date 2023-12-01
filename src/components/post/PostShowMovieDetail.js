import { Fetch } from 'toolbox/Fetch';

export default function PostShowMovieDetail(id) {

    const movieUri = `http://localhost:8080/movie/getMovie/${id}`;

    return <Fetch uri={movieUri} renderSuccess={RenderSuccess} />

    function RenderSuccess(movie) {
        return <div>
            <h4>영화제목: {movie.title}</h4>
            <p>영화줄거리: {movie.overview.length === 0 ? 'NO DATA' : movie.overview}</p>
            <p>영화개봉일: {movie.releaseDate}</p>
            <p>영화인기도: {movie.popularity}</p>
            <p>영화투표평균점수: {movie.voteAverage}</p>
            <p>영화투표횟수: {movie.voteCount}</p>
        </div>
    }
}
