import clientPromise from '../../util/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise
    const db = client.db("chats")
    const body = req.body
    const key = [body.id1, body.id2]
    key.sort()
    const data = await db.collection("chats").findOne(
    {
        "key": key
    })

    console.log(data)

    res.json(
        {
            data: id 
        }
    )
}