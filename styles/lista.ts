import styled, { keyframes } from 'styled-components';
import { Lobster } from '@next/font/google';
import { FaCheck, FaUndo, FaPlus } from 'react-icons/fa';

const spin = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

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
`;

export const ItemContainer = styled.div`
  min-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background: #344d67;
  border-radius: 10px;
  border: 4px solid #ade792;
  margin: 15px;

  @media (max-width: 800px) {
    min-width: 90%;
    border: 2px solid #ade792;
  }
`;

export const CheckButton = styled.button`
  height: 70px;
  width: 70px;
  padding: 5px;
  border-radius: 0px 8px 8px 0px;
  background: #ade792;
  opacity: 0.9;
  @media (max-width: 800px) {
    height: 76px;
    width: 50px;
  }
`;

export const NameArea = styled.div`
  display: flex;
  padding: 5px 15px;
  align-items: center;
`;

export const Label = styled.span`
  font-size: 24px;
  font-weight: 400;
  color: #ade792;
  margin-right: 10px;
`;
export const Check = styled(FaCheck)`
  color: #344d67;
  font-size: 36px;
`;
export const Plus = styled(FaPlus)`
  color: #344d67;
  font-size: 36px;
`;
export const Spinner = styled(FaUndo)`
  animation: 2s linear ${spin} infinite;
  font-size: 120px;
`;

export const Input = styled.input`
  min-height: 50px;
  width: 850px;
  border-radius: 10px;
  background-color: #344d67;
  color: #fff;
  padding-left: 10px;

  @media (max-width: 800px) {
    width: 250px;
  }
`;
