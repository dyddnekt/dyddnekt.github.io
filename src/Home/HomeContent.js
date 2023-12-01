import React, { Component } from 'react';
import styled from 'styled-components';
import Nav from '../layout/Nav';
import Home from './Home';

const HomeContentBlock = styled.div`
    position: relative;
`;

class HomeContent extends Component {
    constructor(props) {
        super(props);
        this.state={
            content:[
                {
                    title:'영화 감상평 무제한',
                    subTitle:'OTT!  "2023 최고" 선정',
                    btnTitle:'무료!',
                    content:'Cont1',
                    backgroundImg:"https://dhgywazgeek0d.cloudfront.net/watcha/image/upload/c_fill,h_1620,q_80,w_2880/v1552634214/g1larnvghhconzkthpfc.jpg"
                },
                {
                    title:'PC에서만!',
                    subTitle:'6편의 작품 감상평을 언제 어디서나 감상',
                    btnTitle:'무료!',
                    content:'Cont2',
                    backgroundImg:"https://dhgywazgeek0d.cloudfront.net/watcha/image/upload/c_fill,h_1620,q_80,w_2880/v1547178294/lbyyruw3z859wq9asnof.jpg"
                },
                {
                    title:'최고의 화질',
                    subTitle:'HD 글씨!',
                    btnTitle:'무료!',
                    content:'Cont3',
                    backgroundImg:"https://dhgywazgeek0d.cloudfront.net/watcha/image/upload/c_fill,h_1620,q_80,w_2880/v1568002969/dcxpkrawmosat0d4epto.jpg"
                },
                {
                    title:'4개 평가 기반 최고의 추천 감상평',
                    subTitle:'소중한 20분 낭비할 순 없으니까',
                    btnTitle:'무료!',
                    content:'Cont4',
                    backgroundImg:"https://dhgywazgeek0d.cloudfront.net/watcha/image/upload/c_fill,h_1620,q_80,w_2880/v1552024363/a5itxxodojdceiwo8qsm.jpg"
                },
                
            ]
        }
    }
    render() {
        const { content } = this.state;
        return (
            <HomeContentBlock>
                <Nav/>
                {
                    content.map((v,i)=>{
                        return(
                        <Home
                            key={i}
                            title={
                                v.title
                            }
                            subTitle={
                                v.subTitle
                            }
                            btnTitle={
                                v.btnTitle
                            }
                            content={
                                v.content
                            }
                            backgroundImg={
                                v.backgroundImg
                            }
                        />
                        )
                    })
                }
            </HomeContentBlock>
        );
    }
}

export default HomeContent;