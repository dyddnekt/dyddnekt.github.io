import React from 'react';
import styled from 'styled-components';

const Cont = styled.div`
    position: relative;
    min-height: 900px;
    .inner{
        height: 100vh;
        width: 100%;
        position: relative;
        margin: 0 auto;
        padding: 0 135px;
    }
    .area_text{
        overflow: hidden;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        z-index: 100;
    }
    .big_tit {
        margin-top: 70px;
        font-size: 55px;
        font-weight: 400;
        letter-spacing: 0.3px;
        line-height: 1;
        color: #fff
    }

    .small_tit {
        margin: 50px 0;
        font-size: 20px;
        opacity: 0.8;
        color: #fff;
        opacity: 0.6;
    }
    .btn {
        display: inline-block;
        height: 60px;
        width: 200px;
        padding: 0 15px;
        margin-top: 35px;
        line-height: 60px;
        border-radius: 30px;
        text-align: center;
        font-size: 20px;
        background-color: #fc426a;
        color: #fff;
    }

`;

const Home = (props) =>{
    const styles = {
        backgroundImage: `url(${props.backgroundImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
    return(
        <>
            <Cont content={props.content} style={styles}>
                <div className="inner">
                    <div className="area_text">
                        <h2 className="big_tit" >{props.title}</h2>
                        <h5 className="small_tit">{props.subTitle}</h5>
                    </div>
                </div>
            </Cont>
        </>
    );
}
export default Home;