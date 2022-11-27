import clientPromise from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const { id, slug, items } = request.body;

    const client = await clientPromise;
    const db = client.db('MinhaLista');
    const minhaLista = db.collection('MinhaLista');

    const lista = await minhaLista.updateOne(
      {
        _id: id,
      },
      {
        slug,
        items,
        updatedAt: new Date(),
      }
    );

    response.status(200).json(lista);
  } catch (error) {}
};
