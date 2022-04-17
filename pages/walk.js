import { useUser } from '../util/auth/useUser';
import styles from '../styles/drive.module.css'
import {getCoordsToString, getLocation, getDistance, getRatio} from '../util/google.js'
import { useEffect, useState } from 'react';
import Nav from "../components/nav.js"
import Pusher from 'pusher-js'


var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true,
  })
  
  // Variable to check if binded to Pusher
  let bound = false
  
  // Subscribing to messenger channel
  const channel = pusher.subscribe('carpool-app')

export default function Walk() {
    const { user } = useUser();
    const [driver, setDriver] = useState("")
    console.log("IN WALK.JS")
    useEffect(() => {
        console.log("IN USE EFFECT")
        if (!bound && user?.email) {
            console.log("IN IF STATEMENT")
            const interval = setInterval(async () => {
                console.log("INTERVAL CALL!")
                const currLocation = await getLocation();
                const response = await fetch('/api/update_pos', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: user.email,
                        pos: currLocation
                    }),
                    headers: {
                    "Content-type": "application/json; charset=UTF-8"
                    }
                })
            }, 5000);

            channel.bind(`found-driver-${user.email}`, async (data) => {
                setDriver(JSON.stringify(data))
            }) 
            bound = true;
            return () => {
                clearInterval(interval);
            }
        }
    },[user])


    return (
        <div className={styles.container}>
            {driver}
            <Nav />
        </div>
    )
}

// {
//     user?.mongoData && <iframe className={styles.map} src={'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA&origin=' + getLocation() + '&destination=' + user.mongoData.live.destination + '&avoid=tolls'} allowFullScreen></iframe>
// }
