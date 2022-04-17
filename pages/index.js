import withAuth from '../util/auth/withAuth';
import { useUser } from '../util/auth/useUser';
import { useRouter } from "next/router";
import { useState } from 'react';

const Index = () => {
  const { user, logout } = useUser();
  const { chatLink, setChatLink } = useState()
  const router = useRouter();

  async function goToChat() {
      const chatID = await fetch('/api/get_chat', {
        method: 'POST',
        body: JSON.stringify({
            id1: "625b42c3e6dc8ef690e611fe",
            id2: "625b4313e6dc8ef690e611ff"
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
    <div >
      <div>Dashboard</div>
      {
        user?.email &&
        <div>
          <div>Email: {user.email}</div>
          <button onClick={logout('/login')}>Logout</button>
        </div> 
      }
      <button onClick={goToChat}>Message User</button>
    </div>
  )
}

export default withAuth(Index);