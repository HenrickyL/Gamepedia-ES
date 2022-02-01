import { colorsDefault } from './../../styleGlobal';
import styled, { keyframes } from "styled-components";

interface IProp{
    position: number;
    len?:number
    color?:string;
    reverse?:boolean;
    linear?:boolean
    spinColor?:string | null
}
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;


export const Pin = styled.span<IProp>`
    position:absolute;
   
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:block;
    transform: rotate(calc(${p => `${p.position}
                        *
                        ${p.len? 360/p.len : 45 }deg`}));
    &::before{
            content: '';
            position: absolute;
            top:0;
            left:calc(50% - 1.25rem);
            width:2.5rem;
            height:2.5rem;
            border-radius: 50%;

            background:red;
            background: linear-gradient(45deg, #c7eeff, ${p=>p.color || '#03a9f4' });
            box-shadow: 0 0 2rem ${p=>p.color || '#00bcd4' };  
    }

    &.rotate{
        animation: ${rotate} 5s ${p=>p.linear?'linear':'ease-in-out'} ${p=>p.reverse && 'reverse'} infinite;
        animation-delay: calc(${p=>`-0.1s*${p.position}`});
        &::before{
            background: linear-gradient(45deg, #c7eeff, ${p=>p.spinColor? p.spinColor: p.color || '#03a9f4' });
            box-shadow: 0 0 2rem ${p=>p.spinColor? p.spinColor: p.color || '#00bcd4' };  
        }
        
    }

`

export const LoaderStyle = styled.div`
    position:relative;
    display:flex;
    width:16rem;
    height:16rem;
    filter:url(#gooey);
    animation: ${rotate} 8s linear infinite;
    
    


    & > svg{ 
        width:0;
        height:0;
    }

`

export const Modal = styled.div`
  position: absolute;
  top:0;
  left:0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content:center;
  width: 100vw;
  height: 100vh;
  background: ${colorsDefault.main};

  div{
    transform: scale(0.5);
  }
`