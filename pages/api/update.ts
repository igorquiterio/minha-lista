import clientPromise from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const { slug, items, createdAt } = request.body;

    const client = await clientPromise;
    const db = client.db('MinhaLista');
    const minhaLista = db.collection('MinhaLista');

    const lista = await minhaLista.replaceOne(
      {
        slug,
      },
      {
        slug,
        items,
        updatedAt: new Date(),
        createdAt,
      }
    );

    response.status(200).json(lista);
  } catch (error) {}
};
