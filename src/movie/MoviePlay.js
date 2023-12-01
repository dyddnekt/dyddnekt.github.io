import styled from 'styled-components';
import { API_KEY, API_URL } from 'modules/movie';
import { useLocation } from 'react-router-dom';

const MovieTemplate = styled.div`
    position: relative;
    background: url('https://dhgywazgeek0d.cloudfront.net/watcha/image/upload/c_fill,h_1620,q_80,w_2880/v1564363966/crosgmb6yawejwkff87a.jpg') no-repeat center;
    background-size: cover;
    position: relative;
    .inner {
        height: 100vh;
        width: 100%;
        position: relative;
        margin: 0 auto;
        padding: 0 135px;
    }
    .area_text {
        display: inline-block;
        overflow: hidden;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        z-index: 100;
    }

    .trailer {
        display: flex;
        justify-content: center;
        align-items: center;
              &:before {
                content: url(}); 
                height: 394px;
                width: 702px;
                display: flex; 
                justify-content: center;
                border:10px transparent solid; 
                border-width: thick;
                border-color:#c92a2a; 
                top: 75%; 
                left: 75%;
        }
    }
    h1 {
        font-size: 30px;
        color: #fff;
    }
`;

const MoviePlay = () => {
    const location = useLocation();
    const state = location.state;

    return (
        <MovieTemplate>
            <div className="inner">
                <div className="area_text">
                    <embed src={`${API_URL}/movie/${state.movieId}/videos?api_key=${API_KEY}`} width={"702px"} height={"394px"} />
                    <br />
                </div>
            </div>
        </MovieTemplate>
    );
}

export default MoviePlay;