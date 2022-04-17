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
    useEffect(() => {
        if (!bound && user?.email) {
            const interval = setInterval(async () => {
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
        }
    },[user])

    async function a() {
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
    }

    return (
        <div className={styles.container}>
            {driver}
            <button onClick={a}>REE</button>
            <Nav />
        </div>
    )
}

// {
//     user?.mongoData && <iframe className={styles.map} src={'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA&origin=' + getLocation() + '&destination=' + user.mongoData.live.destination + '&avoid=tolls'} allowFullScreen></iframe>
// }
