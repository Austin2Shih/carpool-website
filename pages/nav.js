import { CgProfile } from "react-icons/cg"
import { GrHomeRounded } from "react-icons/gr"
import { ImBubble2 } from "react-icons/im"
import Link from 'next/link'
import styles from '../styles/nav.module.css'

function Nav() {
    return (
        <div>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <ul className={styles.list}>
                        <li><Link className={styles.listItem} href='/chat'><ImBubble2 size={40} /></Link></li>
                        <li><Link className={styles.listItem} href='/'><GrHomeRounded size={40} /></Link></li>
                        <li><Link className={styles.listItem} href='/profile'><CgProfile size={40} /></Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nav