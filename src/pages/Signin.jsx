import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Signin = ({ setActiveUser, toggleAuthenticated }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    userEmail: '',
    userPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ userEmail: '', userPassword: '' })
    setActiveUser(payload)
    toggleAuthenticated(true)
    navigate(`/users/${payload.id}`)
  }

  return (
    <div className="signup-page-wrapper">
      <div className="login-form-wrapper">
        <h2>Log-in</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="userEmail">Email</label>
            <input
              onChange={handleChange}
              name="userEmail"
              type="email"
              placeholder="Enter your email"
              value={formValues.userEmail}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="userPassword">Password</label>
            <input
              onChange={handleChange}
              name="userPassword"
              type="password"
              value={formValues.userPassword}
              required
            />
          </div>
          <button
            className="signup-button"
            disabled={!formValues.userEmail || !formValues.userPassword}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signin
