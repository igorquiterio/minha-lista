import clientPromise from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const { slug } = request.body;

    const client = await clientPromise;
    const db = client.db('MinhaLista');
    const minhaLista = db.collection('MinhaLista');

    const listas = await minhaLista.find({ slug }).limit(10).toArray();

    if (listas.length === 0) {
      const lista = await minhaLista.insertOne({
        slug,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      response.status(201).json(lista);
    } else {
      response.status(200).json(listas);
    }
  } catch (e) {
    response.status(500).json({ err: e });
  }
};
