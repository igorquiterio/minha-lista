import React, { useState } from 'react';
import axios from 'axios';

interface Items {
  name: string;
  quantity: number;
}
interface PageParams {
  params: { slug: string };
}

interface PageProps {
  slug: string;
}

function Lista({ slug }: PageProps) {
  const [lista, setLista] = useState();

  return <h1>{slug}</h1>;
}

export async function getStaticProps(pageParams: PageParams) {
  try {
    const { slug } = pageParams.params;

    const response = await axios.post(
      'https://minha-lista.vercel.app/api/find',
      { slug }
    );

    let id;
    let itemList: Items[] = [];

    if (response.status === 201) {
      id = response.data.insertedId;
    }

    console.log(response);

    return {
      props: {
        slug,
        id,
        list: itemList,
      },
    };
  } catch (error) {
    return {
      props: {
        client: {},
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
