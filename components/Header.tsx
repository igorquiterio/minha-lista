import React from 'react';
import Link from 'next/link';
import { Container, Title } from './HeaderStyles';

export const Header: React.FC = () => {
  return (
    <Container>
      <Title>Minha Lista</Title>
    </Container>
  );
};
