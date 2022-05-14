import { useAuth0 } from '@auth0/auth0-react'

const LoginSignup = () => {
  const { loginWithRedirect } = useAuth0()
  return (
    <div className="login-signup-wrapper">
      <button className="login-button" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </div>
  )
}

export default LoginSignup
