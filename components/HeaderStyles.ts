import styled from 'styled-components';
import { Lobster } from '@next/font/google';

const lobster = Lobster({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
});

export const Container = styled.div`
  width: '100%';
  max-width: 1800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  cursor: pointer;
  text-transform: capitalize;
  h1 {
    font-size: 36px;
  }
`;

export const Title = styled.div`
  font-size: 48px;
  font-family: ${lobster.style.fontFamily};
`;
