import React from 'react';
import styled from 'styled-components';

const SlideBlock = styled.div`
    display: inline-block;
    height: 100%;
    width: 100%;
    .cont {
        position: relative;
        background-size: cover;
        height: 100%;
    }
    .area_txt {
        position: absolute;
        display: flex;
        align-items: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
    }
    .work_box {
        width: 100%;
    }
    .work_tit {
        font-size: 50px;
        line-height: 1.2;
        color: #fff;
    }
    .work_desc {
        margin-top: 20px;
        font-size: 20px;
        color: #fff;
        line-height: 1.3;
    }
`;

const Slide = ( props ) => {
    const styles = {
      backgroundImage: `url(${props.backgroundImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 60%'
    }
    return (
        <SlideBlock className="slide" style={styles}>
            <div className='cont'>
                <div className="area_txt">
                    <div className="work_box">
                        <h2 className="work_tit">{props.title}</h2>
                        <p className="work_desc">{props.subTitle}</p>
                    </div>
                </div>
            </div>
        </SlideBlock>)
  }

  export default Slide;