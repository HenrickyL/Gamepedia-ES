import { colorsDefault } from './../../styleGlobal';
import styled from "styled-components";


export const StyComment = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid gray;
    border-radius: 8px;
    transition: 0.3s;

    &:hover{
        border: 1px solid ${colorsDefault.white1};
        transform: translateX(3px);
    }



    .header-comment{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 8px 8px 0 0;
        background: ${colorsDefault.mainLight};
        padding: 3px;

        .comment-date{
            color: gray;
        }
    }


    .user-comment{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        .name{
            font-weight: bold;
        }

        img{
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            border: 2px solid white;
        }
    }
    .comment-content{
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 10px;
        p{
            width: 90%;
        }
    }

`