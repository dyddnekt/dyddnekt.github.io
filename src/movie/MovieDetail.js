import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MovieDetailBlock = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 101;
    background: #0B0C0D;
    border-top: 1px solid #191a1c;
    border-bottom: 1px solid #191a1c;
    opacity: 0;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    &.show {
       
        opacity: 1;
    }
    .movie_detail {
        position: absolute;
        bottom: 10%;
        width: 100vw;
        height: 70vh;
        padding: 4vw;
        overflow: hidden;
        background: #2c2c2c;
        color: #fff;
    }
    .detail_content {
        // float: left;
        // width: 40%;
        height: 100%
        padding-top: 5vw;
        & > .content_wrap {
            margin-bottom: 10px;
        }
        .movie_detail_title {
            font-size: 40px;
            h1 {
                line-height: 1.3;
            }
        }
        .movie_detail_info {
            font-size: 18px;
            p {
                line-height: 1.2;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }

        .movie_detail_icon {
            position: relative;
            display: flex;
            .icon_play {
                background-color: rgb(252, 66, 106);
                color: rgb(255, 255, 255);
                padding: 10px 20px 10px 50px;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.1s ease-in;
                span {
                    font-size: 18px;
                }
                &:before {
                    content:''; 
                    height:0; 
                    width:0; 
                    display:block; 
                    border:7px transparent solid; 
                    border-right-width:0; 
                    border-left-color:rgb(255, 255, 255);; 
                    position:absolute; 
                    top:50%; 
                    left:30px;
                    transform:translate(-50%, -50%);
                }
                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    
    }
    .detail_right {
        float: right;
        width: 50%;
        height: 100%;
    }
`;
 
export const MovieDetail = ({id, clazzName, show, onClick, title, overview, backImg}) => {
    const styles ={
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 60%',
        opacity: '0.7',
    }
    return(
        show ?
            <MovieDetailBlock className={clazzName} onClick={onClick}  >
                <div className="movie_detail" style={styles}>
                    <div className="detail_content">
                        <div className="content_wrap movie_detail_title">
                            <h1>{title}</h1>
                        </div>
                        <div className="content_wrap movie_detail_info">
                            <p>{overview}</p>
                        </div>
                        <div className="left_wrap movie_detail_icon">
                            <Link to="/movie_play" state={{movieId:id}} className="icon_play">
                                <span>재생</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </MovieDetailBlock>
        :
        null
    );
};

export default MovieDetail;