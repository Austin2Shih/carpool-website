import withAuth from '../util/auth/withAuth';
import { useUser } from '../util/auth/useUser';
import { useRouter } from "next/router";
import { FaSearch, FaTimes } from "react-icons/fa"
import {useState} from "react"
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
    return (
        <div className={styles.container}>
            <iframe className={styles.map} src="https://www.google.com/maps/embed/v1/directions?origin=40.7127837,-74.0059413&destination=42.3600825,-71.05888&key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA" allowFullScreen></iframe>
            <div className={styles.search}>
                <FaSearch />
                <input
                    type="text"
                    id="searchBar"
                    className={styles.searchBar}
                    placeholder="Where would you like to go?"
                    value={searchTerm}
                    onInput={e => setSearchTerm(() => e.target.value)}
                />
                <FaTimes onClick={() => setSearchTerm("")}/>
            </div>
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
        </div>
    )
}

export default withAuth(Index);
