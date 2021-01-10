import { createGlobalStyle } from "styled-components";

const isDarkThemeEnabled = false;

export default createGlobalStyle`
    :root {
        --main-bg-color: ${(props) => props.theme.mainBgColor};
        --main-text-color: ${(props) => props.theme.mainTextColor};
        --accent-color: ${(props) => props.theme.accent};
    }
     *{
        margin: 0;
        font-family: sans-serif;
        font-weight: 300;
        color: var(--main-text-color);
     }

     h1, h2 {
         margin-bottom: 2rem;
     }

`;
