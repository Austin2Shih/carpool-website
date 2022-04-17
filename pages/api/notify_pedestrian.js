const Pusher = require('pusher');


let pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
})

export default async function handler(req, res) {
  const data = req.body
  const user = data.user

  await pusher.trigger('carpool-app', `found-driver-${user.email}`, {user}).then((r) => {})
  res.json(user);
}