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
  }, [userId])

  const getUserDetails = async () => {
    const response = await axios.get(
      `https://colabdb.herokuapp.com/api/users/${userId}`
    )
    setUserDetails(response.data)
  }

  // let spotPlay = new DOMParser().parseFromString(
  //   userDetails.userSpotPlay,
  //   'text/html'
  // )

  return activeUser &&
    authenticated &&
    userDetails &&
    parseInt(userId) === activeUser.id ? (
    <div className="user-page-wrapper">
      <div className="user-info">
        <h2>{userDetails.userName}</h2>
        <img
          id="user-pic"
          src={userDetails.userPic}
          alt={userDetails.userName}
        />
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
          {userDetails.Tracks.length > 0 ? (
            <Link
              className="delete-user-link"
              to={`/users/${userId}/deletetrack`}
            >
              <li>Remove Track</li>
            </Link>
          ) : (
            <div></div>
          )}
        </ul>
      </div>
    </div>
  ) : userDetails ? (
    <div className="visit-user-page">
      <div className="visit-user-info">
        <div className="visit-user-banner-section">
          <img id="visit-user-banner" src={userDetails.userBannerPic} />
          <div className="visit-user-pic-wrapper">
            <img
              id="visit-user-pic"
              src={userDetails.userPic}
              alt={userDetails.userName}
            />
            <div>
              <h2 id="visit-user-name">{userDetails.userName}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="visit-user-page-content">
        <div className="visit-user-page-playlist-about-wrapper">
          <div
            className="user-spot-playlist"
            dangerouslySetInnerHTML={{ __html: userDetails.userSpotPlay }}
          ></div>
          <div className="visit-user-about">
            <div className="heading-font">
              about{' '}
              <span className="heading-alt-font">{userDetails.userName}</span>
            </div>
            <p>{userDetails.userAbout}</p>
          </div>
        </div>
        <div className="visit-user-tracks">
          <UserAudioPlayer
            tracks={userDetails.Tracks}
            activeUser={activeUser}
            setTrackDetails={setTrackDetails}
            userDetails={userDetails}
            authenticated={authenticated}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default UserProfile
