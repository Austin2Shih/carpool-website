import React, { useState } from "react";
import { useRouter } from "next/router";
import withAuth from "../util/auth/withAuth";
import { useUser } from "../util/auth/useUser";
import styles from '../styles/form.module.css';

const Settings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [carInfo, setCarInfo] = useState("")
  const {user, logout} = useUser();
  const router = useRouter();

  async function handleSetInfo(e) {
    e.preventDefault();
    await fetch('/api/set_info', {
      method: 'POST',
      body: JSON.stringify({
          email: user.email,
          firstName: firstName,
          lastName: lastName,
          carInfo: carInfo
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    router.push('/')
  }

  return (
    <div className={styles.main}>
        <form onSubmit={handleSetInfo} className={styles.flexColumn}>
          <label>First Name</label>
          <div className={styles.fieldBg}>
            <input
              className={styles.field}
              onChange={(e) => setFirstName(e.target.value)} 
              value={firstName}
              type="text" 
              placeholder="First Name">
            </input>
          </div>
          <label>Last Name</label>
          <div className={styles.fieldBg}>
            <input 
              className={styles.field}
              onChange={(e) => setLastName(e.target.value)} 
              value={lastName}
              type="text" 
              placeholder="Last Name">
            </input>
          </div>
          <label>Car Description</label>
          <div className={styles.fieldBg}>
            <input 
              className={styles.field}
              onChange={(e) => setCarInfo(e.target.value)} 
              value={carInfo}
              type="text" 
              placeholder="Car description">
            </input>
          </div>
          <button className={styles.submit} type="submit">Confirm changes</button>
        </form>
    </div>
  );
}

export default withAuth(Settings)