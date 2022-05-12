import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import UserAudioPlayer from '../components/UserAudioPlayer'

const UserProfile = ({
  activeUser,
  authenticated,
  setUserDetails,
  userDetails,
  userTracks,
  setUserTracks
}) => {
  let { userId } = useParams()

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/users/${userId}`
      )
      setUserDetails(response.data)
    }
    const getUserTracks = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/users/${userId}/tracks`
      )
      setUserTracks(response.data)
    }
    getUserDetails()
    getUserTracks()
  }, [userId])

  return activeUser &&
    authenticated &&
    userDetails &&
    parseInt(userId) === activeUser.id ? (
    <div className="user-page-wrapper">
      <div className="user-welcome">
        <h2>{userDetails.userName}</h2>
      </div>
      <div className="user-page-content">
        <UserAudioPlayer tracks={userTracks} />
      </div>
      <div className="user-page-crud">
        Crud
        <Link to={`/users/${userId}/addtrack`}>Add Track</Link>
      </div>
    </div>
  ) : (
    <div className="protected">
      <h3>Please log in...</h3>
    </div>
  )
}

export default UserProfile
