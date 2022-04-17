<<<<<<< HEAD
import withAuth from '../util/auth/withAuth';
import { useUser } from '../util/auth/useUser';
import { useRouter } from "next/router";
import { useState } from 'react';

const Index = () => {
  const { user, logout } = useUser();
  const { chatLink, setChatLink } = useState()
  const router = useRouter();

  async function goToChat(id2) {
      const chatID = await fetch('/api/get_chat', {
        method: 'POST',
        body: JSON.stringify({
            id1: user.mongoData._id,
            id2: id2
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
=======
<<<<<<< Updated upstream
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
>>>>>>> find-detour
  return (
    <div >
      <div>Dashboard</div>
      {
        user?.email &&
        <div>
          <div>Email: {user.email}</div>
          <button onClick={logout('/login')}>Logout</button>
        </div> 
      }
      <button onClick={() => goToChat("625b42c3e6dc8ef690e611f")}>Message User</button>
    </div>
  )
=======
import withAuth from '../util/auth/withAuth';
import { useUser } from '../util/auth/useUser';
import { useRouter } from "next/router";
import { FaSearch, FaTimes } from "react-icons/fa"
import { useState } from "react"
import styles from '../styles/Home.module.css'

const Index = () => {
    const { user, logout } = useUser();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className={styles.container}>
            <iframe className={styles.map} src="https://www.google.com/maps/embed/v1/directions?origin=40.7127837,-74.0059413&destination=42.3600825,-71.05888&key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA" allowfullscreen></iframe>
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
        
        </div>
    )
>>>>>>> Stashed changes
}

export default withAuth(Index);