import clientPromise from '../../util/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db("users")
  const body = req.body
  await db.collection("users").insertOne(body)
    .then(async (id) => {
        console.log(`user created with email: ${body.email}`)
        return id.email
    }).catch(async () => {
        console.log('user could not be created')
        return null
    })

    res.json({})
}