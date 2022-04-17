import clientPromise from '../../util/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db('users')

  const data = req.body
  const email = data.email
  const firstName = data.firstName
  const lastName = data.lastName
  const carInfo = data.carInfo
  const response = await db.collection("users").updateOne(
    {
      "email": email,
    },
    {
      $set: { "info.first_name" : firstName, "info.last_name" : lastName, "info.car_desc" : carInfo},
    },
    {
      upsert: true
    }
    ).then(() => {
      console.log("User info updated!")
    }).catch((error) => {
      console.log(error)
    })
  res.json(response);
}