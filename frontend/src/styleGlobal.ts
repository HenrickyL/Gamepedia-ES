import styled from "styled-components"
import {extendTheme, withDefaultColorScheme} from '@chakra-ui/react'


export const colorsDefault={
    bg: '#fafafa',
    main: '#330977',
    mainGlass: 'rgba(51,9,119,0.9)',
    mainLight:'#4923B4',
    primary: '#1A81D9',
    secundary:'#60D199',
    tertiary: '#F8F800',
    white1:'#F3F8FF',
    white2:'#FFFAFA',
    white3:'#F3F9FB',
    indicator: '#29fd53'
}


export const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: (props:any) => ({
        dialog: {
          color:'white',
          bg: colorsDefault.mainLight,
          Button:{
            color:'black'
          }
        }
      })
    }
  }
});



export var Aplication = styled.div`
    *, *::before, *::after  {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }  
    
    display: flex;
    flex-direction:column;
    width: 100vw;
    height: 100vh;
    -webkit-font-smoothing: antialiased;
    background: ${colorsDefault.bg};


  html {
    @media(max-width: 1080px) {
      font-size: 93.75%; // 15px
    }
    @media(max-width: 720px) {
      font-size: 87.5%; // 14px
    }
  }

`

