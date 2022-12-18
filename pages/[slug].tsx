import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../components';
import {
  Check,
  CheckButton,
  Container,
  Input,
  ItemContainer,
  Label,
  NameArea,
  Plus,
  Spinner,
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
  console.log(itemList);

  const [list, setList] = useState<Items[]>([]);
  const [currentItem, setCurrentItem] = useState<Items>({
    name: '',
    quantity: 0,
  });

  useEffect(() => {
    return setList(itemList);
  }, [itemList]);

  useEffect(() => {
    axios.post('https://minha-lista.vercel.app/api/update', {
      id,
      slug,
      items: list,
    });
  }, [list]);

  const handleAddButton = async () => {
    setList((old) => [...old, currentItem]);
    setCurrentItem({
      name: '',
      quantity: 0,
    });
  };

  const handleCheckButton = async (idx: number) => {
    setList(
      list.filter((ele, i) => {
        return i !== idx;
      })
    );
  };

  return (
    <>
      {slug ? <Header title={slug} /> : null}
      <Container>
        {slug ? (
          list?.map((item, idx) => {
            return (
              <ItemContainer key={`${idx}-${item}`}>
                <NameArea>
                  <Label>{item?.name}</Label>
                  {item?.quantity ? <Label>{item?.quantity}</Label> : null}
                </NameArea>
                <CheckButton onClick={() => handleCheckButton(idx)}>
                  <Check />
                </CheckButton>
              </ItemContainer>
            );
          })
        ) : (
          <>
            <Header title={'Carregando'} />
            <Spinner />
          </>
        )}
        <ItemContainer>
          <NameArea>
            <Input
              placeholder='Nome do item'
              value={currentItem.name}
              onChange={(event) =>
                setCurrentItem({ name: event.target.value, quantity: 0 })
              }
            />
          </NameArea>
          <CheckButton
            onClick={() => (currentItem.name !== '' ? handleAddButton() : '')}
          >
            <Plus />
          </CheckButton>
        </ItemContainer>
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
