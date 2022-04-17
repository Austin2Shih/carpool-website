import clientPromise from '../../util/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise
    const db = client.db("chats")
    const body = req.body
    const key = [body.id1, body.id2]
    key.sort()
    
    const insertData = {
        key: key,
        messages: []
    }

    let chatID


    const data = await db.collection("chats").findOne(
    {
        "key": key
    }).then(async (r) => {
        return JSON.parse(JSON.stringify(r))
    })

    if (data) {
        chatID = data._id
    }else {
        console.log("ELSE");
        const response = await db.collection("chats").insertOne(insertData)
        .then(async (id) => {
            console.log(`chat created for: (${key[0]}, ${key[1]})`)
            return id.insertedId
        }).catch(async () => {
            console.log('chat could not be created')
            return null
        })
        const formatted = JSON.parse(JSON.stringify(response))
        chatID = formatted
    }

    res.json(
        {
            id: chatID
        }
    )
}