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
  setUserTracks,
  setTrackDetails
}) => {
  let { userId } = useParams()

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/users/${userId}`
      )
      setUserDetails(response.data)
    }

    getUserDetails()
    getUserTracks()
  }, [userId, setUserDetails, setUserTracks])

  const getUserTracks = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/users/${userId}/tracks`
    )
    setUserTracks(response.data)
  }

  const destroyTrack = async (trackId) => {
    await axios.delete(`http://localhost:3001/api/tracks/${trackId}`)
    getUserTracks()
  }

  return activeUser &&
    authenticated &&
    userDetails &&
    parseInt(userId) === activeUser.id ? (
    <div className="user-page-wrapper">
      <div className="user-welcome">
        <h2>{userDetails.userName}</h2>
      </div>
      <div className="user-page-content">
        <UserAudioPlayer
          tracks={userTracks}
          activeUser={activeUser}
          setTrackDetails={setTrackDetails}
          destroyTrack={destroyTrack}
        />
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
