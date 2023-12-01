import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../image/logo.png';

const NavBlock = styled.nav`
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 70px;
    padding: 0 50px;
    transition: all .5s ease-in;
    &:after {
        display: block;
        content: '';
        clear: both;
    }
`;

const LeftNav = styled.div`
float: left;
background: url(${Logo}) no-repeat
width: 180px;
height: 100%;
background-size: contain;
text-indent: -9999px;
.logo {
    display: block;
    width: 100%;
    height: 100%;
}
`;

const RightNav = styled.div`
float: right;
`;

const NavList = styled.ul`
    position: relative;
    `;
    
    const ListLi =  styled.li`
    display: inline-block;
    padding: 0 20px;
    .btn {
        display: inline-block;
        height: 32px;
        padding: 0 15px;
        margin-top: 19px;
        line-height: 32px;
        border-radius: 30px;
        text-align: center;
        font-size: 15px;
        background-color: #fff;
    }
    `;
    
    const Nav = props => {
        return (
            <NavBlock {...props}>
            <LeftNav>
                <Link to='/' className="logo" ></Link>
            </LeftNav>
            <RightNav>
                <NavList>
                    <ListLi>
                    </ListLi>
                </NavList>
            </RightNav>
        </NavBlock>
    );
}

export default Nav;
