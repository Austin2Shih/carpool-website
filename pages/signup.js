import { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../util/firebase';

export default function SignUp() {
  console.log("AUTH", auth)
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const router = useRouter();
    const [error, setError] = useState(null);

    async function create_user(user) {
      const data = {
        id: user.user.id,
        email: user.user.email,
        info : {
          first_name: null,
          last_name: null,
          car_desc: null,
        },
        live: {
          position: null,
          state: null
        }
      }
      await fetch("/api/create_user", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
    }

    function handleSignUp(e) {
      e.preventDefault();
      if(passwordOne === passwordTwo)
        createUserWithEmailAndPassword(auth, email, passwordOne)
        .then(async (userCredential) => {
          create_user(userCredential)
          console.log("Success. The user is created in Firebase")
          router.push("/");
        })
        .catch(error => {
          // An error occurred. Set error message to be displayed to user
          setError(error.message)
        });
      else
        setError("Password do not match")
    };

  return (
    <div>
      <h1>Sign up!</h1>
      {error}
      <form onSubmit={handleSignUp}>
          <label>Email</label>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            type="email" 
            placeholder="Email">
          </input>
          <label>Password</label>
          <input 
            onChange={(e) => setPasswordOne(e.target.value)} 
            value={passwordOne}
            type="password" 
            placeholder="Password">
          </input>
          <label>Confirm Password</label>
          <input 
            onChange={(e) => setPasswordTwo(e.target.value)} 
            value={passwordTwo}
            type="password" 
            placeholder="Password">
          </input>
          <input type="submit"></input>
        </form>
    </div>

  )
}