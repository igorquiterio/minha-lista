import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
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
import useDebounce from '../hooks/useDebounce';
import { Turret_Road } from '@next/font/google';

interface Items {
  name: string;
  quantity?: number;
}
interface PageParams {
  params: { slug: string };
}

interface PageProps {
  slug: string;
  id: string;
  createdAt: string;
}

function Lista({ slug, id, createdAt }: PageProps) {
  const [list, setList] = useState<Items[]>([]);
  const [currentItem, setCurrentItem] = useState<Items>({
    name: '',
    quantity: 0,
  });
  const [loading, setLoading] = useState(false);
  const debouncedRefresh = useDebounce(currentItem.name, 500);
  const router = useRouter();
  const query = router.asPath.replace('/', '');

  const populateList = async (willShowLoading = false, pooling = false) => {
    if (willShowLoading) setLoading(true);

    const response = await axios.post(
      'https://minha-lista.vercel.app/api/find',
      {
        slug: slug || query,
      }
    );

    const newList = response.data[0].items;

    setList(newList);

    setLoading(false);
    if (pooling) {
      setTimeout(() => {
        populateList();
      }, 60000);
    }
  };

  useEffect(() => {
    if (debouncedRefresh) {
      populateList();
    }
  }, [debouncedRefresh]);

  useEffect(() => {
    populateList(true, true);
  }, []);

  useEffect(() => {}, [list]);

  const handleAddButton = async () => {
    setList([...list, currentItem]);
    setCurrentItem({
      name: '',
      quantity: 0,
    });
    await axios.post('https://minha-lista.vercel.app/api/update', {
      slug,
      items: [...list, currentItem],
      createdAt,
    });
    setLoading(false);
  };

  const handleCheckButton = async (idx: number) => {
    const newList = list.filter((ele, i) => {
      return i !== idx;
    });
    setList(newList);
    await axios.post('https://minha-lista.vercel.app/api/update', {
      slug,
      items: newList,
    });
    setLoading(false);
  };

  return (
    <>
      {slug ? <Header title={slug} /> : null}
      <Container>
        {slug && !loading ? (
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
        {slug ? (
          <ItemContainer>
            <NameArea>
              <Input
                placeholder='Nome do item'
                value={currentItem.name}
                onChange={(event) => {
                  setCurrentItem({ name: event.target.value, quantity: 0 });
                }}
              />
            </NameArea>
            <CheckButton
              onClick={() => (currentItem.name !== '' ? handleAddButton() : '')}
            >
              <Plus />
            </CheckButton>
          </ItemContainer>
        ) : null}
      </Container>
    </>
  );
}

export async function getStaticProps(pageParams: PageParams) {
  const { slug } = pageParams.params;

  const response = await axios.post('https://minha-lista.vercel.app/api/find', {
    slug,
  });

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
      createdAt: response.data[0].createdAt,
      revalidate: 10, // In seconds
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default Lista;
