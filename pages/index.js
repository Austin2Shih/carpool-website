import withAuth from '../util/auth/withAuth';
import { useUser } from '../util/auth/useUser';
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa"
import { useState } from "react"

import Nav from "./nav.js"

import styles from '../styles/Home.module.css'
import Link from 'next/link';

const Index = () => {

    const { user, logout } = useUser();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");

    async function goToChat(user2) {
        const res = await fetch('/api/get_user', {
            method: 'POST',
            body: JSON.stringify({
                email: user2
            }),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
        const r1 = await res.json()
        console.log("MONGODATA", user.mongoData)
        const chatID = await fetch('/api/get_chat', {
          method: 'POST',
          body: JSON.stringify({
              name1: user.mongoData.info.first_name,
              id1: user.mongoData._id,
              name2: r1.info.first_name,
              id2: r1._id
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(async (r) => {
          const res = await r.json()
          return res.id
        })
        router.push(`/chat?id=${chatID}`)
    }
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
            <button onClick={() => goToChat('austinhshih@gmail.com')}>Message User</button>
            <button>
                <Link href="/settings">Change Settings</Link>
            </button>
            <Nav />
        </div>
    )
}

export default withAuth(Index);
