import { colorsDefault } from './../../styleGlobal';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const StyReviewCard = styled(NavLink)`
    border: 1px solid black;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background: ${colorsDefault.secundary};
    width: 100%;
    transition: 0.3s;
    margin-bottom: 5px;
    gap:5px;
    header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 10px;

    }
    img{
        width: 3rem;
        height: 3rem;
        border: 2px solid white;
        padding: 5px;

        border-radius: 50%;
    }
    .title{
        font-size: 20px;
        font-family: sans-serif;
        font-weight: bold;
        box-shadow: none;
    }
    p{
        color:black
    }
    .date{
        color: gray;
    }

    &:hover{
        box-shadow: 2px 3px 5px black;
        border-color: white;
    }
    &:active{
        transform: scale(0.99);
    }
`