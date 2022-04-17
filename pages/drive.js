import { useUser } from '../util/auth/useUser';
import { useState } from "react"
import { ImBubble2 } from "react-icons/im"
import styles from '../styles/drive.module.css';

import Nav from "./nav.js"

function Drive() {
    const { user } = useUser();

    const [click, setClick] = useState('false');

    const handleClick = () => {
        if (click === 'false') {
            setClick('true');
        } else {
            setClick('false');
        }
    }

    const closeAlert = () => setClick('false');

    async function coordinateToLocation(latitude, longitude) {
        // https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA&latlng=38.9855176,-77.5598243
        let locationInfo = {};
        const load = async () => {
            try {
                const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA');
                locationInfo = await res.json();
            } catch(err) {
                console.error(err);
            }
        };
    
        const output = await load().then(
            () => locationInfo.results.formatted_address
        )
    
        return output
    }

    async function getLocation() {
        const res = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA', {
            method: 'POST',
            body: JSON.stringify({
                
            })
        })
        const coordLocation = await res.json()
        console.log(coordLocation)
        return coordinateToLocation(coordLocation.location.lat, coordLocation.location.lng)
    }

    function alertUser() {

    }

    return (
        <div className={styles.container}>
            {
                user?.mongoData && <iframe className={styles.map} src={'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA&origin=' + getLocation() + '&destination=' + user.mongoData.live.destination + '&avoid=tolls'} allowFullScreen></iframe>
            }
            <button className={styles.listItem} onClick={() => goToChat('austinhshih@gmail.com')}><ImBubble2 size={40} /></button>
            <button onClick={() => handleClick}></button>
            <div className={styles.alert} visible={click}>
                <h1>{`${user.info.first_name} is coming to pick you up in a ${user.info.car_desc}. Keep an eye out!`}</h1>
                <button onClick={() => closeAlert}>Okay</button>
            </div>
            <Nav />
        </div>
    )
}

export default Drive