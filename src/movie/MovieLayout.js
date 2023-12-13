import styled from 'styled-components';

const MovieLayoutBlock = styled.div`
    position: relative;
    z-index: 100;
    margin-top: -150px;
    .movie_wrap > h3{
        padding: 0 50px;
        margin-bottom: 10px;
        color: #fff;
        line-height: 1.3;
        font-size: 20px;
    }
`;


const MovieLayout = ({children}) => {
    return(
        <MovieLayoutBlock>
            <div className="movie_wrap">
               {children}
            </div>
        </MovieLayoutBlock>
    );
};

export default MovieLayout;