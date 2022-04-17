import React, { useState } from "react";
import { useRouter } from "next/router";
import {auth} from '../util/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import styles from '../styles/form.module.css';
import Image from 'next/image'
import logo from '../assets/logo.png'

export default function FirebaseAuth() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")
  const [error, setError] = useState(null)
  const router = useRouter();

  function handleReset(e) {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("We have sent the reset password email")
      }).catch((error) => {
        setError(error.message)
        console.log("ERROR: ", error)
      })
  }

  return (
    <div className={styles.main}>
      <h1>Ride Assured</h1>
      <Image 
        src={logo} 
        width={200}
        height={200}/>
        <h2>Reset Password</h2>
        {error}
        {message}
        <form onSubmit={handleReset} className={styles.flexColumn}>
          <label>Email</label>
          <div className={styles.input_border}>
            <input 
              className={styles.field}
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              type="email" 
              placeholder="Email">
            </input>
          </div>
          <div className={styles.button_container}>
            <button className = {styles.input_submit} type="submit">Submit</button>
          </div>
        </form>
    </div>
  );
}