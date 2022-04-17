import {getRatio, getCoordsToString} from '../../util/google.js'
import clientPromise from '../../util/mongodb';

export default async function handler(req, res) {
    const data = req.body
    const start1 = data.start1
    const dest1 = data.dest1
    const client = await clientPromise
    const db = client.db("users")
    const users = await db.collection("users").find({
        "live.state": { $eq: "walking"}
    }).toArray()
    let maxRatio = 0;
    let maxUserIndex = 0;
    for (let i = 0; i < users.length; i++) {
        const start2 = await getCoordsToString(users[i].live.position.lat, users[i].live.position.lng)
        const dest2 = users[i].live.destination
        const ratio = await getRatio(start1, dest1, start2, dest2)
        if (ratio > maxRatio) {
            maxRatio = ratio;
            maxUserIndex = i;
        }
        console.log(`USER AT ${i}`, users[i])
        console.log("RATIO", ratio)
    }
    if (maxRatio <= 0) {
        res.json({
            data: null
        })
    } else {
        res.json(users[maxUserIndex]);
    }

}