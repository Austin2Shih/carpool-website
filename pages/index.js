import withAuth from '../util/auth/withAuth';
import { useUser } from '../util/auth/useUser';
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa"
import { useState } from "react"

import Nav from "../components/nav"

import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { route } from 'next/dist/server/router';

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

    async function submitDriver() {
        const res = await fetch('/api/update_live', {
            method: 'POST',
            body: JSON.stringify({
                "email": user.email,
                "dest": searchTerm,
                "state": "driving"
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        router.push('/drive')
    }

    async function submitWalker() {
        const res = await fetch('/api/update_live', {
            method: 'POST',
            body: JSON.stringify({
                "email": user.email,
                "dest": searchTerm,
                "state": "walking"
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        router.push('/walk')
    }

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
            <iframe className={styles.map} src='https://www.google.com/maps/embed/v1/place?key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA&q=Davis+CA' allowFullScreen></iframe>

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

            <button className={styles.driver} onClick={submitDriver}>
                {"I'm Driving"}
            </button>

            <button className={styles.walker} onClick={submitWalker}>
                {"I'm Walking"}
            </button>

            {
                locations?.predictions &&
                <div className={styles.locationsList}>
                    {locations.predictions.map((location, index) => {
                        return (
                            <div key={index}>
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
