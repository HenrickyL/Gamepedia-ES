import { colorsDefault } from './../../styleGlobal';
import styled from "styled-components";


interface IProp{
    loading:boolean
}
export const StyReviewPage = styled.div<IProp>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: ${colorsDefault.mainLight};
    width: 100%;
    height: 100%;
    align-items: center;
    
    
    .all-reviews{
        margin-top: 2rem;
        max-height: 36rem;
        overflow-y: auto;
    }




`