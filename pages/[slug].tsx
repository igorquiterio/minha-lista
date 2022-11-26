import React from 'react';
import axios from 'axios';

interface PageParams {
  params: { slug: string };
}

interface PageProps {
  slug: string;
}

function Lista({ slug }: PageProps) {
  return <h1>{slug}</h1>;
}

export async function getStaticProps(pageParams: PageParams) {
  try {
    const { slug } = pageParams.params;

    const response = axios
      .post('https://minha-lista.vercel.app/api/find', { slug })
      .then((res) => {
        console.log(res);
      });
    console.log(response);

    return {
      props: {
        slug: 'oi',
      },
    };
  } catch (error) {
    return {
      props: {
        client: {},
      },
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
