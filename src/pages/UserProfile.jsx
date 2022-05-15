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
    getUserDetails()
  }, [userId, userDetails])

  const getUserDetails = async () => {
    const response = await axios.get(
      `https://colabdb.herokuapp.com/api/users/${userId}`
    )
    setUserDetails(response.data)
  }

  return activeUser &&
    authenticated &&
    userDetails &&
    parseInt(userId) === activeUser.id ? (
    <div className="user-page-wrapper">
      <div className="user-info">
        <h2>{userDetails.userName}</h2>
        <img src={userDetails.userPic} alt={userDetails.userName} />
        <p>{userDetails.userAbout}</p>
        <div className="user-spot-playlist"></div>
      </div>
      <div className="user-page-content">
        <UserAudioPlayer
          tracks={userDetails.Tracks}
          activeUser={activeUser}
          setTrackDetails={setTrackDetails}
          userDetails={userDetails}
          authenticated={authenticated}
        />
      </div>
      <div className="user-page-crud">
        <ul>
          <Link className="add-track-link" to={`/users/${userId}/addtrack`}>
            <li>Add Track</li>
          </Link>

          <Link className="update-user-link" to={`/users/${userId}/update`}>
            <li>Update User</li>
          </Link>
          <Link
            className="delete-user-link"
            to={`/users/${userId}/deletetrack`}
          >
            <li>Remove Track</li>
          </Link>
        </ul>
      </div>
    </div>
  ) : userDetails ? (
    <div className="user-page-wrapper">
      <div className="user-info">
        <h2>{userDetails.userName}</h2>
        <img src={userDetails.userPic} alt={userDetails.userName} />
        <p>{userDetails.userAbout}</p>
        <div className="user-spot-playlist"></div>
      </div>
      <div className="user-page-content">
        <UserAudioPlayer
          tracks={userDetails.Tracks}
          activeUser={activeUser}
          setTrackDetails={setTrackDetails}
          userDetails={userDetails}
          authenticated={authenticated}
        />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default UserProfile
