import { BsGear } from "react-icons/bs"
import { GrHomeRounded } from "react-icons/gr"
import { useUser } from '../util/auth/useUser';
import { useRouter } from "next/router";
import { useState } from "react"
import Link from 'next/link'
import styles from '../styles/nav.module.css'

function Nav() {
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
        <div>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <ul className={styles.list}>
                        <li><Link className={styles.listItem} href='/'><GrHomeRounded size={40} /></Link></li>
                        <li><Link className={styles.listItem} href='/settings'><BsGear size={40} /></Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nav
