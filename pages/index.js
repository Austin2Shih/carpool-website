import withAuth from '../util/auth/withAuth';
import { useUser } from '../util/auth/useUser';
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa"
import { useState } from "react"

import Nav from "./nav.js"

import styles from '../styles/Home.module.css'

const Index = () => {

    const { user, logout } = useUser();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");

    let locations = {};

    const load = async () => {
        try {
            const res = await fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + searchTerm + '&types=geocode&key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA');
            locations = await res.json();
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <iframe className={styles.map} src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA&q=Davis+CA" allowFullScreen></iframe>
            
            <div className={styles.search}>
                <FaSearch className={styles.icon} />
                <input 
                    type="text"
                    id="searchBar"
                    className={styles.searchBar}
                    placeholder="Where would you like to go?"
                    value={searchTerm}
                    onInput={e => {
                        setSearchTerm(() => e.target.value)
                        load()
                    }}
                />
            </div>
            
            {
                locations?.predictions &&                    
                <div className={styles.locationsList}>
                    {locations.predictions.map(location => {
                        return (
                            <div>
                                <h2>{location.description}</h2>
                            </div>
                        )
                    })}
                </div>
            }

            {
                user?.email &&
                <div>
                    <div>Email: {user.email}</div>
                    <button onClick={logout('/login')}>Logout</button>
                </div> 
            }
            <Nav />
        </div>
    )
}

export default withAuth(Index);