import { ObjectID } from 'bson'
import clientPromise from '../../util/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db('chats')
  const id = req.body._id
  const data = await db.collection("chats").findOne(
      {
          "_id": ObjectID(id)
      }).catch()

  const output = JSON.parse(JSON.stringify(data))

  res.json(output);
}