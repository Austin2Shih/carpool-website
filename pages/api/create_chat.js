import clientPromise from '../../util/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db("chats")
  const body = req.body
  const key = body.key
  const data = {
      key: key,
      messages: []
  }
  await db.collection("chats").insertOne(data)
    .then(async (id) => {
        console.log(`chat created for: (${key[0]}, ${key[1]}`)
        return id
    }).catch(async () => {
        console.log('user could not be created')
        return null
    })

    res.json(
        {
            data: id 
        }
    )
}