import React from 'react';
import styled from 'styled-components';
import Nav from 'layout/Nav';

const MainBlock = styled.div`
    height: 100%;
    padding: 56px 0 0;
`;

const MainBox =  styled.main`
    position: relative;
    padding-bottom: 8rem;
    background-color: #141517;
`;

const Main =({children}) => {
    return(
        <MainBlock>
            <Nav className="scrolling"/>
            <MainBox>
                {children}
            </MainBox>
        </MainBlock>
    );
}

export default Main;