import { useAuth0 } from '@auth0/auth0-react'

const Logout = () => {
  const { logout } = useAuth0()

  return (
    <button
      className="logout-button"
      onClick={() => logout({ returnTo: 'http://localhost:3000/' })}
    >
      Log Out
    </button>
  )
}

export default Logout
