import { createGlobalStyle } from 'styled-components';
import { Roboto, Lobster } from '@next/font/google';

const roboto = Roboto({
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const lobster = Lobster({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
});

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: ${roboto.style.fontFamily};
  }
  body {
    background: #344D67;
    color: #F3ECB0;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font-size: 16px;
  }
  h1{
    font-family: ${lobster.style.fontFamily};
  }
  h1, h2, h3, h4, h5, h6, strong {
    color: #6ECCAF;
  }
  button {
    cursor: pointer;
  }
`;
