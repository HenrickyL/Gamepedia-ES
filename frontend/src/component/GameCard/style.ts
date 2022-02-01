import styled from "styled-components";
import {NavLink} from 'react-router-dom'
import { colorsDefault } from "../../styleGlobal";


interface IProp{
    bg?:string
}
export const StyGameCard = styled(NavLink)<IProp>`
    width: 300px;
    height: 200px;
    border-radius:8px;
    border: 1px solid ${colorsDefault.white1};
    background-image: url(${p=> `${p.bg!=null? p.bg :  colorsDefault.main}`});
    background-repeat:no-repeat;
    background-position: center;
    background-size:cover;
    transition: 0.3s;
    filter: brightness(0.7);
    &:hover{
        transform: scale(1.01);
        box-shadow: 2px 3px 5px black;
        filter: brightness(1);


    }
`