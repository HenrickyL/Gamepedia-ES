import { colorsDefault } from './../../styleGlobal';
import styled from "styled-components";

export const StyGamePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: ${colorsDefault.mainLight};

    .all-games{
        width: 70%;
    }

` 