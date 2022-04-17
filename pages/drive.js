import { useUser } from '../util/auth/useUser';
import styles from '../styles/drive.module.css'
import {getCoordsToString, getLocation, getDistance, getRatio} from '../util/google.js'
import { useEffect, useState } from 'react';
import Nav from "../components/nav"

let bound = false
function Drive() {
    const { user } = useUser();
    const [pedestrian, setPedestrian] = useState(null)

    useEffect(() => {
        if (!bound && user?.email) {
            const interval = setInterval(async () => {
                if (!pedestrian) {
                    const currLocation = await getLocation();
                    const start1 = await getCoordsToString(currLocation.lat, currLocation.lng)
                    console.log(currLocation)
                    console.log(start1)
                    const response = await fetch('/api/get_detour', {
                        method: 'POST',
                        body: JSON.stringify({
                            start1: start1,
                            dest1: user.mongoData.live.destination
                        }),
                        headers: {
                        "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    const r = await response.json();
                    setPedestrian(r)
                    await fetch('/api/notify_pedestrian', {
                        method: 'POST',
                        body: JSON.stringify({
                            "user" : user 
                        }),
                        headers: {
                        "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                }

            }, 5000);
        }
    },[user])


    return (
        <div className={styles.container}>
            {pedestrian}
            <Nav />
        </div>
    )
}

export default Drive

// {
//     user?.mongoData && <iframe className={styles.map} src={'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA&origin=' + getLocation() + '&destination=' + user.mongoData.live.destination + '&avoid=tolls'} allowFullScreen></iframe>
// }
