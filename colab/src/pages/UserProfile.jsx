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
        `https://colabdb.herokuapp.com/api/users/${userId}`
      )
      setUserDetails(response.data)
    }

    getUserDetails()
    getUserTracks()
  }, [userId, setUserDetails, setUserTracks])

  const getUserTracks = async () => {
    const response = await axios.get(
      `https://colabdb.herokuapp.com/api/users/${userId}/tracks`
    )
    setUserTracks(response.data)
  }

  const destroyTrack = async (trackId) => {
    await axios.delete(`https://colabdb.herokuapp.com/api/tracks/${trackId}`)
    getUserTracks()
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
          tracks={userTracks}
          activeUser={activeUser}
          setTrackDetails={setTrackDetails}
          destroyTrack={destroyTrack}
        />
      </div>
      <div className="user-page-crud">
        Crud
        <ul>
          <li>
            <Link className="add-track-link" to={`/users/${userId}/addtrack`}>
              Add Track
            </Link>
          </li>
          <li>
            <Link
              className="create-colab-link"
              to={`/users/${userId}/createcolab`}
            >
              Create Co-lab
            </Link>
          </li>
          <li>
            <Link className="update-user-link" to={`/users/${userId}/update`}>
              Update User
            </Link>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="protected">
      <h3>Please log in...</h3>
    </div>
  )
}

export default UserProfile
