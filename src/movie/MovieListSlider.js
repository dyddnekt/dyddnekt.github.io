import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MovieDetail from './MovieDetail';

const MovieListLi = styled.li`
    padding: 0 2px;
    transition: all .2s ease-in;
    cursor: pointer;
    .movie_detail_move {
        display: block;
    }
    .title_li_box {

    }
    .movie_img_box {
        position: relative;
        overflow: hidden;
        width: 15vw;
        height: 10vw;
        background-size: 100% 100%;
        border-radius: 1px;
        cursor: pointer;
        transition: 0.5s;
        color: white;
        &:hover {
            width: 22vw;
            height: 15vw;
            transition: 0.4s;
            opacity: 1;
            transition-delay: 0.3s;
            .movie_item {
                visibility: visible;
            }
        }
    }
    .movie_img {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border: 1px solid #fff;
    }

    .movie_item {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity:0;
        visibility: hidden;
        &:hover {
            width: 22vw;
            height: 15vw;
            opacity: 1;
            transition: 0.4s;
            transition-delay: 0.4s;
            
        }
        &_1 {
            flex-grow: 1;
            text-align: center;
            margin: 0 auto;
        }
        &_2,&_3,&_4 {
            align-self: flex-start;
            font-size: 1.2rem;
            margin-bottom: 0.5vw;
            padding: 0 15px;
        }
        &_5 {
            margin-bottom: 0.5vw;
            text-align: center;
        }
       
        .movie_play {
            display: flex;
            justify-content: center;
            align-items: center;
            .icon_play {
              position: relative;
              justify-content: center;
              width: 3vw;
              height: 3vw;
              margin-top:3vw;
              border-radius: 40px;
              background: rgba(0, 0, 0, 0.5);
              border: 2px solid #fff;
              &:before {
                content:''; 
                height:0; 
                width:0; 
                display:block; 
                border:10px transparent solid; 
                border-right-width:0; 
                border-left-color:#c92a2a; 
                position:absolute; 
                top:50%; 
                left:54%;
                transform:translate(-50%, -50%);
              }
            }
          }
          .icon_detail {
                position:relative;
                display:block;
                height:40px;
                width:40px; 
                &:before {
                    content:'';
                    position:absolute;
                    bottom:15px;
                    left:7px; 
                    height:20px; 
                    width:20px; 
                    display:block; 
                    border:3px solid #fff; 
                    border-right-width:0; 
                    border-top-width:0; 
                    transform:rotate(-45deg);
                    -webkit-transform:rotate(-45deg);
                    -moz-transform:rotate(-45deg);
                    -o-transform:rotate(-45deg);
                    -ms-transform:rotate(-45deg);
                }
                &:hover:before {
                    content:'';
                    position:absolute;
                    bottom:15px;
                    left:7px; 
                    height:20px; 
                    width:20px; 
                    display:block; 
                    border:3px solid #000; 
                    border-right-width:0; 
                    border-top-width:0; 
                    transform:rotate(-45deg);
                    -webkit-transform:rotate(-45deg);
                    -moz-transform:rotate(-45deg);
                    -o-transform:rotate(-45deg);
                    -ms-transform:rotate(-45deg); 
                }
            }
    }
    .movie_tit {
        width: 15vw;
        margin-top: 5px;
        font-size: 15px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #fff;
    }
   
`;


const MovieListSlider = ({id, title, date, overview, average, poster, backImg}) => {
    const [ detail, setDetail ] = useState(false);
    let body = document.getElementsByTagName('body')[0];
    const showDetail = () => {
        setDetail(true);
        body.classList.add("not_scroll");
    }
    const closeDetail = () => {
        setDetail(false);
        body.classList.remove("not_scroll");
    }
    return(
           <>
                <MovieListLi>
                    <div className="movie_img_box">
                        <img className="movie_img" src={`https://image.tmdb.org/t/p/original/${poster}`} alt={title}/>
                        <div className="movie_item">
                            <div className="movie_item_1">
                                <div className="movie_play">
                                    <Link to='/movie_play' state={{movieId:id}} className="icon_play"/>
                                </div>
                            </div>
                            <div className="movie_item_2">
                                <p className="movie_title">제목: {title}</p>
                            </div>
                            <div className="movie_item_3">
                                <p className="movie_desc">출시일: {date}</p>
                            </div>
                            <div className="movie_item_4">
                                <p className="movie_info">평점: {average}</p>
                            </div>
                            <div className="movie_item_5" onClick={() => showDetail()}>
                                <i className="icon_detail"/>
                            </div>
                        </div>
                    </div>
                    <div className="movie_tit">
                        <span>{title}</span>
                    </div>
                </MovieListLi>
                <MovieDetail
                    id={id}
                    clazzName={"movieContainer " + (detail ? "show" : "hide")}
                    show={detail}
                    title={title}
                    overview={overview}
                    backImg={backImg}
                    onClick={() => closeDetail()}
                />
            </>
    );
}

export default MovieListSlider;