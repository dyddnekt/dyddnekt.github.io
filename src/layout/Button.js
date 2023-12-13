import React from 'react';
import styled, { css } from 'styled-components';

const StyleButton = styled.button`
    width: 290px;
    height: 52px;
    margin-bottom: 20px;
    border: none;
    border-radius: 50px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    ${props =>
        props.sign &&
        css`
            background-color: #fc426a;
        `}
    ${props =>
        props.facebook &&
        css`
            background-color: #4065b3;
        `}
`;

const Button = props => <StyleButton {...props} />

export default Button;