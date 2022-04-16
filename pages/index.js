import withAuth from '../util/auth/withAuth';
import { useUser } from '../util/auth/useUser';
import { useRouter } from "next/router";

const Index = () => {
  const { user, logout } = useUser();
  const router = useRouter();
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
      
    </div>
  )
}

export default withAuth(Index);