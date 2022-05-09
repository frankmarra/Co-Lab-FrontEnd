import { useState, useEffect } from 'react'
import axios from 'axios'

const UserProfile = () => {
  const [users, setUsers] = useState({})

  const getUsers = async () => {
    const response = await axios.get(`http://localhost:8000/users/1`)
    setUsers(response.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="user-page-wrapper">
      <div className="user-page-name">{users.userName}</div>
    </div>
  )
}

export default UserProfile
