import { createGlobalStyle } from 'styled-components'
import { CarrouselStyles } from './CarrouselStyles'

export const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    :focus {
        outline: 0;
    }

    body {
       
    }

    body, input, textarea button {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    button, a {
        cursor: pointer;
    }

    a {
       text-decoration: none;
       color: black;
       
    }

   

    ${CarrouselStyles}

`
