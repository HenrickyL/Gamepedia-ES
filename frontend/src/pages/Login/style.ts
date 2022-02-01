import styled, { keyframes } from "styled-components";

const gradient = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50%{
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`



export const StyLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    animation: ${gradient} 15s ease infinite;
    background-size: 400% 400%;
    & > form{
        background: white;
        display: flex;
        flex-direction:column;
        align-items: center;
        padding: 20px;
        border: 2px solid #aaa;
        border-radius: 8px;
        flex-wrap: 10px;
        min-height: 17rem;
        min-width: 20rem;


        
        .input{
            width: 100%;
            max-width: 30rem;
            margin-bottom: 10px;
        }
        .button{
            margin-top: 2rem;
        }
        h1{
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 2rem;
        }

    }
`