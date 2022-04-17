import { useUser } from '../util/auth/useUser';
import styles from '../styles/drive.module.css'
import {getCoordsToString, getLocation, getDistance, getRatio} from '../util/google.js'
import { useEffect, useState } from 'react';
import Nav from "./nav.js"

let bound = false
function Drive() {
    const { user } = useUser();
    const [pedestrian, setPedestrian] = useState()
    let detoursList = [];

    useEffect(() => {
        if (!bound && user?.email) {
            const interval = setInterval(async () => {
                const currLocation = await getLocation();
                const start1 = await getCoordsToString(currLocation.lat, currLocation.lng)
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
            }, 5000);
            bound = true;
        }
    },[user])


    return (
        <div className={styles.container}>
            <Nav />
        </div>
    )
}

export default Drive

// {
//     user?.mongoData && <iframe className={styles.map} src={'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA&origin=' + getLocation() + '&destination=' + user.mongoData.live.destination + '&avoid=tolls'} allowFullScreen></iframe>
// }