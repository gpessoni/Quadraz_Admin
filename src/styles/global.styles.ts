import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
    html, body{
        padding: 0;
        margin: 0;
        scroll-behavior: smooth;
        font-family: 'poppins regular', 'Open Sans', sans-serif;
        
        ::-webkit-scrollbar {
            display: none;
        }
    }

    img{
        max-width: 100% !important;
    }

    a{
        text-decoration: none;
    }
    
    @font-face {
      font-family: poppins light;
      src: url("/fonts/Poppins-Light.ttf");
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: poppins medium;
      src: url("/fonts/Poppins-Medium.ttf");
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: poppins regular;
      src: url("/fonts/Poppins-Regular.ttf");
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: poppins semibold;
      src: url("/fonts/Poppins-SemiBold.ttf");
      font-style: normal;
      font-display: swap;
    }

`
