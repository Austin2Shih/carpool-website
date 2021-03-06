import React, { useState, useEffect } from "react";
import clientPromise from '../util/mongodb';
import { ObjectID } from 'bson'
import Pusher from 'pusher-js'
import { useUser } from "../util/auth/useUser";
import ChatMessages from "../components/ChatMessages";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import Nav from "../components/nav";
import styles from "../styles/chat.module.css"
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

export default function Chat(props) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(<ChatMessages className={styles.bubble} data={props.data}></ChatMessages>);
  const {user, logout} = useUser();
  
  async function handleMessageSend(e) {
    e.preventDefault();
    setMessage("")
    await fetch(`/api/send_message`, {
      method: 'POST',
      body: JSON.stringify({
          "_id" : `${chatID}`,
          "name": user.mongoData.info.first_name,
          "message" : message
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
  } 

  function getOtherName () {
    let otherName;
      if (user.mongoData._id == props.data.user1.id) {
        otherName = props.data.user2.name
      } else {
        otherName = props.data.user1.name
      }
      return otherName
  }

  const chatID = props.data._id

  useEffect(() => {
    if (!bound) {
        channel.bind(`new-message-${chatID}`, async () => {
            await fetch(`/api/get_chat_by_id`, {
                method: 'POST',
                body: JSON.stringify({
                    "_id" : `${chatID}`,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(async(response) => {
                const r = await response.json()
                console.log(r)
                setChat(<ChatMessages className={styles.bubble} data={r}></ChatMessages>)
            })
        }) 
                   
        bound = true
    }
}, [chatID])

  return (
      <div className={styles.wrapper}>
        {
          user?.email &&
          <div className={styles.header}>
            <h1>{`${getOtherName()}`}</h1>
          </div>
        }
        <div className={styles.container}>
          {chat}
        </div>
        <form onSubmit={handleMessageSend}>
          <div className={styles.message}>
            <input
              className={styles.messageBar}
              onChange={(e) => setMessage(e.target.value)} 
              value={message}
              type="text" 
              placeholder="Message...">
            </input>
            <button className={styles.send} type="submit">Send</button>
          </div>
        </form>
        <Nav />
    </div>
  )
}
