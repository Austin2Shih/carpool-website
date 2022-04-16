import React, { useState, useEffect } from "react";
import clientPromise from '../util/mongodb';
import { ObjectID } from 'bson'
import Pusher from 'pusher-js'

// Initializing Pusher
var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
})

// Variable to check if binded to Pusher
var bound = false

// Subscribing to messenger channel
const channel = pusher.subscribe('carpool-app')

export async function getServerSideProps(context) {
  const client = await clientPromise
  const db = client.db("chats")
  const {query} = context
  const id = query.id
  const data = await db.collection("chats").findOne(
      {
          "_id": ObjectID(id)
      })

  const output = JSON.parse(JSON.stringify(data))
  return {
      props: {
          "data" : output
      }
  }
}


export default function Home(props) {
  const [message, setMessage] = useState("");
  const [chatMsg, setChatMsg] = useState("default");
  const [user, logout] = useUser();
  async function handleMessageSend(e) {
    e.preventDefault();
    await fetch(`/api/send_message`, {
      method: 'POST',
      body: JSON.stringify({
          "_id" : `${chatID}`,
          "userId": user.id,
          "message" : message
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
  } 

  const chatID = props.data._id

  useEffect(() => {
    if (!bound) {
        channel.bind(`new-message-${chatID}`, async () => {
            await fetch(`/api/get_message`, {
                method: 'POST',
                body: JSON.stringify({
                    "_id" : `${chatID}`,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(async (response) => {
                await response.json().then((res) => {
                    setChatMsg(res.message)
                })
            })
        }) 
                   
        bound = true
    }
}, [chatID])
  return (
      <div>
        <form onSubmit={handleMessageSend}>
          <label>Message</label>
          <input 
            onChange={(e) => setMessage(e.target.value)} 
            value={message}
            type="text" 
            placeholder="Message">
          </input>
          <input type="submit"></input>
        </form>
        {`Message: ${chatMsg}`}
    </div>
  )
}
