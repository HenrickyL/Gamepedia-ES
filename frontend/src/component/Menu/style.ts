import styled from "styled-components";
import {colorsDefault} from '../../styleGlobal'
import {NavLink} from 'react-router-dom'
import { GoSearch } from 'react-icons/go';
import { FaUser } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';



export const Search = styled(GoSearch)``
export const StySearch = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    color: black;

    ${Search}{
        position: absolute;
        font-size:1.5rem;
    }

    input{
        padding: 5px;
        padding-left:2rem;
        border-radius: 8px;
        outline: none;
        font-size: 15px;
    }
`



export const NavElem = styled(NavLink)``

export const StyMainMenu = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    height: 100%;

    ${NavElem}{
        display:inline-block;
        transition: 0.5s;
        position: relative;
        color: gray;
        font-size: 20px;
        font-weight: 400;
        margin: 0 2rem;
        padding: 10px;

        &::after{
            transition: 0.3s;

            content:'';
            position: absolute;
            bottom: 5px;
            left: 50%;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
        }
        &:nth-child(1)::after{
                background: ${colorsDefault.primary};
        }
        &:nth-child(2)::after{
                background: ${colorsDefault.secundary};
        }
        &:nth-child(3)::after{
                background: ${colorsDefault.tertiary};
        }

        &.active{
            font-weight: bold;
            color: ${colorsDefault.white1};
            &::after{
                content:'';
                position: absolute;
                bottom: 5px;
                left: 0;
                width: 100%;
                height: 0.3rem;
                border-radius: 50%;
            }
        }
        &::before {
            display: block;
            content: attr(value);
            font-weight: bold;
            height: 0;
            overflow: hidden;
            visibility: hidden;
        }

        
    }

`

export const StyAuthOptions = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    
    & > ${NavElem}:last-child{
        background-color: ${colorsDefault.primary};
        font-size: 19px;
        font-weight: bold;



    }
    ${NavElem}{
        transition: 0.3s;
        font-size: 17px;
        padding: 5px;
        border-radius: 8px;

        &.active{
            background-color: ${colorsDefault.tertiary};
            font-size: 20px;
            font-weight: bold;
            color: black;
        }
    }

    

    
`

export const StyOptionMenu  = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px;
    
`

export const LogoutIcon = styled(IoLogOutOutline)`
    color: white;
    font-size: 1.8rem;
    transition: 0.3s;

    &:active{
        transform: scale(0.95);
        color: red;
    }
`
export const UserIcon = styled(FaUser)`
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    background-color: white;
    transition: 0.3s;

    color: black;
    font-size: 1.5rem;
    
    &:hover{
        transform: scale(0.95);
    }

`
export const StyUser = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`

export const StyMenu = styled.div`
    position: relative;
    z-index: 5;
    /* display: flex; */
    display: grid;
    grid-template-columns: 5fr 1fr 5fr;
    /* flex-direction: row; */
    background-color: ${colorsDefault.main};
    align-items: center;
    justify-content: center;
    color: ${colorsDefault.white1};
    height: 5rem;

    @media(max-width: 600px) {
        display: flex;
        flex-direction: column-reverse;

        ${StyOptionMenu}{ 
            position: absolute;
            z-index: 5;
            top: -10%;
            width: 80%;
        }
    }

    .logo{
        transition: 0.5s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        height: 100% ;
        /* img:first-child{
            width: 45px;
        }
        img:last-child{
            height: 40px;
        } */
        img{
            position: absolute;
            bottom: -20%;
            height: 50px;
        }

        &.active{
            transform: scale(1.1);


        }
        background-image: url('/logo.svg');
        background-repeat: no-repeat;
        background-position-x: center;
        
    }
`


