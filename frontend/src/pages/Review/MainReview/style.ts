import { Textarea } from '@chakra-ui/react';
import { colorsDefault } from './../../../styleGlobal';
import styled from "styled-components";

interface IProp{
    bg?:string
}
export const StyMainReview = styled.div<IProp>`
    position: relative;
    width: 100%;
    height: 100%;
    background: black;
    color:white;

    .bg{
        position: absolute;
        top: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        filter: blur(3px);
        background-image: url(${p=>p.bg});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .content{
        display: grid;
        flex-direction: column;
        padding: 2rem;
        position: absolute;
        z-index: 1;
        width:100%;
        height:100%;
        overflow: hidden;
        

        

        form{
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            box-shadow: inset 0 0 2000px rgba(0, 0, 0, .6);
            backdrop-filter: blur(8px);
            gap: 5px;
            padding: 2rem;
            background: ${colorsDefault.mainGlass};
            height: 100%;
            overflow-y: auto;
        }

            .header{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                .game-img{
                    display: flex;
                    height:8rem;
                }

                .user{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 5px;
                    border-radius: 8px;
                    background: ${colorsDefault.secundary};
                    .name{
                        color: black;
                    }
                }
              
                


            span{
                color: gray;
                font-weight: bold;
            }
            .left{
                display: flex;
                flex-direction:row;
                align-items: center;
                gap: 1rem;
            }
            .title{
                font-size: 28px;
                font-weight: bold;
            }
            .user-img{
                width: 3.5rem;
                border: 2px solid white;
                border-radius: 50%;
                img{
                    border-radius: 50%;
                    padding: 3px;
                }
            }
        }

        .main-content{
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: justify;
            text-justify: inter-word;
            max-height: 20rem;
            height: 100%;
            width: 100%;
            overflow-y: auto;
            p{
                width: 70%;
                padding: 5px;
            }
        }
        .footer{
            align-self:center;
            width: 90%;

            form{
                width: 100%;

                Textarea{
                    color: black;
                    resize: none;

                    background: white;
                }
                .buttom{
                    width: 8rem;
                    align-self: flex-end;
                    color: black;

                }
                
            }
        }

        .comments{
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 1rem;
            width: 100%;
            height: 100%;
            max-height: 10rem;
            overflow-y: auto;
            .info{
                color:gray;
            }
        }
    }

    
`