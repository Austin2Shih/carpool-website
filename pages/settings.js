import React, { useState } from "react";
import { useRouter } from "next/router";
import withAuth from "../util/auth/withAuth";
import { useUser } from "../util/auth/useUser";

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
    <div>
        <form onSubmit={handleSetInfo}>
          <label>First Name</label>
          <input 
            onChange={(e) => setFirstName(e.target.value)} 
            value={firstName}
            type="text" 
            placeholder="First Name">
          </input>
          <label>Last Name</label>
          <input 
            onChange={(e) => setLastName(e.target.value)} 
            value={lastName}
            type="text" 
            placeholder="Last Name">
          </input>
          <label>Car Description</label>
          <input 
            onChange={(e) => setCarInfo(e.target.value)} 
            value={carInfo}
            type="text" 
            placeholder="A short description of your car">
          </input>
          <input type="submit"></input>
        </form>
    </div>
  );
}

export default withAuth(Settings)