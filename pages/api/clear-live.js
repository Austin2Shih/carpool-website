import clientPromise from '../../util/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db('users')
  const data = req.body
  const email = data.email
  const response = await db.collection("users").updateOne(
    {
      "email": email,
    },
    {
      $set: { "live.state" : null},
    },
    {
      upsert: true
    }
    ).then(() => {
      console.log("User live-info cleared!")
    }).catch((error) => {
      console.log(error)
    })
  res.json(response);
}