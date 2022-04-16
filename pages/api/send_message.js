import { ObjectID } from 'bson';
import clientPromise from '../../util/mongodb';
const Pusher = require('pusher');


let pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
})

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db('chats')

  const data = req.body
  const chatID = data._id
  const message = data.message
  const response = await db.collection("chats").updateOne(
    {
      "_id": ObjectID(chatID),
    },
    {
      $push: { "messages" : {
        "id": req.userID,
        "message": message,
      }}
    },
    {
      upsert: true
    }
    ).then(async () => {
      const res = await pusher.trigger('carpool-app', `new-message-${chatID}`, {}).then((r) => {
    }).catch((error) => {
      console.log(error)
    })
  })
  res.json(response);
}