import React from 'react';
import Link from 'next/link';
import { Container, Title } from './HeaderStyles';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Container onClick={() => console.log('oi')}>
      <Title>{title}</Title>
    </Container>
  );
};
