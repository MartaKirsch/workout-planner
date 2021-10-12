import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    /* variables */
    :root {
        --yellow: #FFB703;
        --orange: #FB8500;
        --tangerine: #F2CC8F;
        --pale: #F4F1DE;
        --dark-blue: #023047;
        --turqoise: #219EBC;
        --pale-blue: #8ECAE6;
        --darker-pale-blue: #7DB9D5;

        --nav-padding: 32px;
        --iconbutton-width: 50px;
        --logobar-height: 70px;
    }

    *, *::after, *::before {
        box-sizing:border-box;
    }

    html, body {
        padding:0;
        margin:0;    

        font-family: 'Montserrat', sans-serif;
        font-size: 18px;

        color: "#363636";
    }

    h1,h2,h3,h4,h5,button,label{
        font-family: 'Revalia', cursive;
        margin:0;
        padding:0;
    }
    p{
        margin:0;
    }

    a {
        text-decoration:none;
    }

    input, textarea {
        font-family: 'Roboto', sans-serif;
    }
    
    button {
        cursor:pointer;
    }

    input, button {
        outline:none;
        border:none;
    }
`;
