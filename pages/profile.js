import { useUser } from '../util/auth/useUser';
import styles from '../styles/form.module.css'

export default function Profile() {
    const { user, logout } = useUser();

    return (
        <div>
            <h1 className={styles.name}>Name</h1>
            <button className={styles.edit}>Edit Profile</button>
            <h2 className={styles.car}>Drives a Honda Pilot</h2>
        </div>
    )
}