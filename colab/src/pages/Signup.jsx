import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Signup = ({ setActiveUser }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  let navigate = useNavigate()
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let newUser = await RegisterUser({
      userName: formValues.name,
      userEmail: formValues.email,
      userPassword: formValues.password
    })
    setActiveUser(newUser)
    setFormValues({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    navigate(`/users/${newUser.id}`)
  }

  return (
    <div className="signup-page-wrapper">
      <div className="signup-form-wrapper">
        <h2>Create a New Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Pick Username"
              value={formValues.name}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              value={formValues.password}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              name="confirmPassword"
              type="password"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <button
            className="signup-button"
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Sign up
          </button>
        </form>
      </div>
      <div className="signup-about-wrapper">
        <div className="signup-about">
          <h2>Co-lab</h2>
          <h4>Words about Co-lab</h4>
        </div>
      </div>
    </div>
  )
}

export default Signup
