import { createGlobalStyle } from 'styled-components'
import { CarrouselStyles } from './CarrouselStyles'

export const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;

        &::-moz-selection {
            color: ${(props) => props.theme['black-800']};
            background: ${(props) => props.theme['pink-400']};;
        }

        &::selection {
            color: ${(props) => props.theme['black-800']};
            background: ${(props) => props.theme['pink-400']};;
        }
    }

   
    :focus {
        outline: 0;
    }

    body {
        padding-top: 80px;
    }

    body, input, textarea button {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    button, a {
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }

    a {
       text-decoration: none;
       color: black;
      -webkit-tap-highlight-color: transparent;

    }

   

    ${CarrouselStyles}

    .ReactModal__Overlay{
        z-index: 99999 !important;
    }
    @media (max-width: 768px){
        .ReactModal__Content.ReactModal__Content--after-open {
            width: 100% !important;
            height: 100% !important;
        }
    }

`
export const AdminStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;

        &::-moz-selection {
            color: ${(props) => props.theme['black-800']};
            background: ${(props) => props.theme['pink-400']};;
        }

        &::selection {
            color: ${(props) => props.theme['black-800']};
            background: ${(props) => props.theme['pink-400']};;
        }
    }

   
    :focus {
        outline: 0;
    }

    body, input, textarea button {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    button, a {
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }

    a {
       text-decoration: none;
       color: black;
      -webkit-tap-highlight-color: transparent;

    }

   

    ${CarrouselStyles}

    .ReactModal__Overlay{
        z-index: 99999 !important;
    }
    @media (max-width: 768px){
        .ReactModal__Content.ReactModal__Content--after-open {
            width: 100% !important;
            height: 100% !important;
        }
    }

`
