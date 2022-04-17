import React, { useState } from "react";
import { useRouter } from "next/router";
import {auth} from '../util/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import styles from '../styles/form.module.css';
import Image from 'next/image'
import logo from '../assets/logo.png'


export default function FirebaseAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const router = useRouter();

  function handleLogin(e) {
    e.preventDefault();
    console.log(auth, email, password)
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("logged in!")
        console.log(userCredential)
        router.push("/");
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
        {error}
        {}
        <form onSubmit={handleLogin} className={styles.flexColumn}>
          <div className={styles.input_border}>
            <input 
              className={styles.field}
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              type="email" 
              placeholder="Email">
            </input>
          </div>
          <div className={styles.input_border}>
            <input 
              className={styles.field}
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              type="password" 
              placeholder="Password">
            </input>
          </div>
          <div className={styles.button_container}>
            <button className = {styles.input} type="submit">Log in</button>
          </div>
        </form>
        <p>
          <Link href="/signup">
            Sign Up
          </Link>
        </p>
        <p>
          <Link href="/resetPassword">
            <a>Forgot Password?</a>
          </Link>
        </p>
    </div>
  );
}