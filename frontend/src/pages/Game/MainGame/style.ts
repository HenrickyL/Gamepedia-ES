import { colorsDefault } from './../../../styleGlobal';
import styled from "styled-components";
import {colorsDefault as color} from '../../../styleGlobal'



export const StyAttachments = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    img{
        border-radius: 8px;
        width: 100%;
    }
    &:last-child{
        background: red;
    }
`

export const StyDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 25rem;
    border: 1px solid #a0a0a0;
    padding: 1rem;
    border-radius: 8px;
    text-align:center;
    color: ${color.white1};
    
    table{
        
        tr td:first-child{
            color: #a0a0a0;

        }
        tr td:last-child{
            font-weight: bold;
        }
        td div{
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
        }
        td svg{
            font-size: 1.5rem;
        }
    }

    h1{
        font-size:38px;
        margin-bottom:30px;
        margin-top:30px;
    }

    h2{
        font-size:24px;
    }

    h3{
        font-size:18px;
    }
    p{
        text-align: justify;
        text-justify: inter-word;
    }
`

export const StyCurrentReviews = styled.div`
    color: white;
    width: 100%;
    .divider {
        margin-bottom: 10px;
    }
    h1{
        font-size: 24px;
    }
`
export const StyContent = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    padding-top: 2rem;
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
    align-items: center;

    
    
    .title{
        font-family: 'Mochiy Pop P One', sans-serif;
        font-size: 3rem;
        color: ${color.white1};
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    }
    form{
        display: grid;
        flex-direction: column;
        justify-content: center;
        background: ${color.mainGlass};
        border-radius: 8px;
        width: 98%;
        padding:2rem 0px ;
        box-shadow: 0 3px 20px ${colorsDefault.mainGlass};
        backdrop-filter: blur(px);
        -webkit-backdrop-filter: blur(8px);
        
        .form-content{
            display: flex;
            flex-direction: row;
            gap: 1rem;
            height: 100%;
            
            .main{
                display: flex;
                flex-direction: column;
                height: 100%;
                align-items: center;
                overflow-y: auto;
                overflow-x: hidden;
                width: 800px;
                max-height: 42rem;

            }

        }

       
        
    }
`


interface IMainGameProp{
    bg:string
}
export const StyMainGame = styled.div<IMainGameProp>`
    position: relative;
    width: 100%;
    height: 100%;
    background: black;

    
    .bg{
        position: absolute;
        top: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        filter: blur(3px);
        background-image: url(${p=>p.bg});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

   


`