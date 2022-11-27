import React, { useState } from 'react';
import axios from 'axios';
import { Header } from '../components';
import {
  Check,
  CheckButton,
  Container,
  ItemContainer,
  Label,
  NameArea,
} from '../styles/lista';

interface Items {
  name: string;
  quantity: number;
}
interface PageParams {
  params: { slug: string };
}

interface PageProps {
  slug: string;
  id: string;
  itemList: Items[];
}

function Lista({ slug, id, itemList }: PageProps) {
  // const [list, setList] = useState(itemList);
  const [list, setList] = useState([
    { name: 'abacaxi', quantity: 2 },
    { name: 'melão', quantity: 3 },
    { name: 'maça', quantity: 5 },
    { name: 'teste', quantity: 0 },
  ]);

  return (
    <>
      <Header title={slug} />
      <Container>
        {list.map((item) => {
          return (
            <>
              <ItemContainer>
                <NameArea>
                  <Label>{item.name}</Label>
                  {item.quantity ? <Label>{item.quantity}</Label> : null}
                </NameArea>
                <CheckButton>
                  <Check />
                </CheckButton>
              </ItemContainer>
            </>
          );
        })}
      </Container>
    </>
  );
}

export async function getStaticProps(pageParams: PageParams) {
  try {
    const { slug } = pageParams.params;

    const response = await axios.post(
      'https://minha-lista.vercel.app/api/find',
      { slug }
    );

    let id = '0';
    let itemList: Items[] = [];

    if (response.status === 201) {
      id = response.data.insertedId;
    } else {
      id = response.data[0]._id;
      itemList = response.data[0].items;
    }

    return {
      props: {
        slug,
        id,
        itemList,
      },
    };
  } catch (error) {
    return {
      props: {
        slug: 'Erro tente novamente mais tarde',
        id: '000',
        itemList: [],
      },
      revalidate: 5,
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default Lista;
