import clientPromise from '../../util/mongodb';

export default async function handler(req, res) {
  console.log("HIIIII")
  const client = await clientPromise
  const db = client.db('users')
  const data = req.body
  const email = data.email
  const currPos = data.pos
  console.log("CURRPOS", currPos)
  const response = await db.collection("users").updateOne(
    {
      "email": email,
    },
    {
      $set: { "live.position" : currPos},
    },
    {
      upsert: true
    }
    ).then(() => {
      console.log("check that we are here!")
    }).catch((error) => {
      console.log(error)
    })
  res.json(response);
}