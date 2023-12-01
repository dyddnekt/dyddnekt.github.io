import React, { Component } from 'react';
import styled from 'styled-components';
import Slide from './Slide';

const SliderBlock =  styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

const SliderWrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`;

const LeftArrowBlock = styled.div`
    position: absolute;
    top: 50%;
    left: 25px;
    width: 40px;
    heigh: 40px;
    z-index: 999;
    &:before {
      content:'';
      position:absolute; 
      display:block; 
      top:7px; 
      left:7px; 
      height:20px; 
      width:20px; 
      border:3px solid #adb5bd; 
      border-right-width:0; 
      border-bottom-width:0; 
      transform:rotate(-45deg);
      cursor:pointer;
    }
`;

const RightArrowBlock = styled.div`
  position: absolute;
  top: 50%;
  right: 25px;
  width: 40px;
  heigh: 40px;
  z-index: 999;
  &:before {
    content:'';
    position:absolute; 
    display:block; 
    top:7px; 
    right:7px; 
    height:20px; 
    width:20px; 
    border:3px solid #adb5bd; 
    border-left-width:0; 
    border-top-width:0; 
    transform:rotate(-45deg);
    cursor:pointer;
  }
`;

// 이전버튼
const LeftArrow = (props) => {
    return (
      <LeftArrowBlock onClick={props.goToPrevSlide}/>
    );
  }

// 다음버튼
const RightArrow = (props) => {
  return (
    <RightArrowBlock onClick={props.goToNextSlide}/>
  );
}

class Slider extends Component {
    constructor(props) {
      super(props)
      this.state={
          content:[
              {
                  title:'11월 1주 신작',
                  subTitle:'맘마미아!, 보이후드 등',
                  backgroundImg:'https://dhgywazgeek0d.cloudfront.net/watcha/image/upload/c_fill,h_1620,q_80,w_2880/v1497512297/jm1efp1tlmzwqg12mght.jpg'
              },
              {
                title:'중세, 그리고 퇴폐미',
                subTitle:'화려한 이면 뒤 암흑의 시기, 중세배경의 영화들',
                backgroundImg:'https://dhgywazgeek0d.cloudfront.net/watcha/image/upload/c_fill,h_1620,q_80,w_2880/v1564113416/qc8txgzqiwyftqbklzdd.jpg'
              },
              {
                title:'하루끝엔, 시트콤',
                subTitle:'지친 일상에 웃음이 필요할 때',
                backgroundImg:'https://dhgywazgeek0d.cloudfront.net/watcha/image/upload/c_fill,h_1620,q_80,w_2880/v1552894858/s0jdpxja7gw2vfvyrupk.jpg'
              },
          ],
          currentIndex: 0,
          translateValue: 0
      }
    }
    
    //이전버튼 로직
    goToPrevSlide = () => {
      if(this.state.currentIndex === 0)
        return this.setState({
          currentIndex: this.state.content.length - 1,
          translateValue: -(this.slideWidth()) * (this.state.content.length - 1)
        })

      this.setState(prevState => ({
        currentIndex: prevState.currentIndex - 1,
        translateValue: prevState.translateValue + this.slideWidth()
      }))
    }
    
    //다음버튼 로직
    goToNextSlide = () => {
      if(this.state.currentIndex === this.state.content.length - 1) {
        return this.setState({
          currentIndex: 0,
          translateValue: 0
        })
      }
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1,
        translateValue: prevState.translateValue + -(this.slideWidth())
      }));
    }
    
    //slide width
    slideWidth = () => {
       return document.querySelector('.slide').clientWidth
    }
  
    render() {
      const { content } = this.state;
      return (
        <SliderBlock>
          <SliderWrapper
            style={{
              transform: `translateX(${this.state.translateValue}px)`,
              transition: 'transform ease-out 0.5s'
            }}>
              {
               content.map((v, i) => (
                  <Slide 
                    key={i} 
                    title = {v.title}
                    subTitle = {v.subTitle}
                    backgroundImg ={v.backgroundImg} 
                  />
                ))
              }
          </SliderWrapper>
          <LeftArrow goToPrevSlide={this.goToPrevSlide}/>
          <RightArrow goToNextSlide={this.goToNextSlide}/>
        </SliderBlock>
      );
    }
  }
  
  export default Slider;