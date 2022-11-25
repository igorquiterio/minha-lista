import clientPromise from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const { slug } = request.body;

    const client = await clientPromise;
    const db = client.db('MinhaLista');

    const listas = await db
      .collection('MinhaLista')
      .find({ slug })
      .limit(10)
      .toArray();

    console.log(listas);

    response.json(listas);
  } catch (e) {
    console.error(e);
  }
};
