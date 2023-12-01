import React from 'react';
import styled from 'styled-components';
import Slider from './Slider';

const MainSlideBlock = styled.div`
    position: relative;
    padding-top: 50%;
    overflow: hidden;
   .wrap {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
   }
   .container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        z-index: 100;
   }
`;

const MainSlider = () => {
    return (
        <MainSlideBlock>
            <div className="wrap">
                {/* container 부터 슬라이드. */}
                <div className="container">
                    <Slider/>
                </div>
            </div>
        </MainSlideBlock>
    );
}

export default MainSlider;