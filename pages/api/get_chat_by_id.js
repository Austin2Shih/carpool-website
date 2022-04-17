import clientPromise from '../../util/mongodb';
import { ObjectID } from 'bson'


export default async function handler(req, res) {
    const client = await clientPromise
    const db = client.db("chats")
    const body = req.body
    const id = body._id
    
    let chatID

    const data = await db.collection("chats").findOne(
    {
        "_id": ObjectID(id)
    }).then(async (r) => {
        return JSON.parse(JSON.stringify(r))
    })
    res.json(data)
}