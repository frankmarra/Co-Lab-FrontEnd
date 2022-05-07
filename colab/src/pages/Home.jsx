import LoginSignup from '../components/LoginSignup'
import Logout from '../components/Logout'
import UserProfile from './UserProfile'

const Home = ({ setUser }) => {
  return (
    <div className="home-wrapper">
      <LoginSignup setUser={setUser} />
      <Logout />
      <UserProfile />
    </div>
  )
}

export default Home
