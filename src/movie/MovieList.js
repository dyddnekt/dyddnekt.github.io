import styled from 'styled-components';

const MovieSliderBlock = styled.div`
    height: 100%;
`;

const MovieListBox = styled.div`
    padding: 0 50px 20px;
    .movie_ul {
        display: flex;
        align-items: center;
        width: 100%;
        white-space: nowrap;
        transition: all 0.5s;
        padding: 15px 0;
        overflow-y: hidden;
        &::-webkit-scrollbar {
            height: 1vh;
        }
        &::-webkit-scrollbar-thumb {
            background: #495057;
            border-radius: 30px;
        }

        .movie_ul > li {
            padding: 0 2px;
            transition: all .2s ease-in;
            cursor: pointer;
        }
    }
`;

const MovieList = ({children}) => {
    return(
        <MovieSliderBlock>
            <MovieListBox>
                <ul className="movie_ul">
                    {children}
                </ul>
            </MovieListBox>
        </MovieSliderBlock>
    );
};

export default MovieList;