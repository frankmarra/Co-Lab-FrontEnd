import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import UserAudioPlayer from '../components/UserAudioPlayer'
import ViewCollabs from '../components/ViewCollabs'

const UserProfile = ({
  activeUser,
  authenticated,
  setUserDetails,
  userDetails,
  userTracks,
  setUserTracks,
  setTrackDetails,
  allTracks
}) => {
  let { userId } = useParams()

  const [viewColabs, setViewColabs] = useState(false)

  useEffect(() => {
    getUserDetails()
  }, [userId])

  const getUserDetails = async () => {
    const response = await axios.get(
      `https://co-lab-backend-production.up.railway.app/api/users/${userId}`
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
        <img
          id="user-pic"
          src={userDetails.userPic}
          alt={userDetails.userName}
        />
        <h4>You have been a part of {userDetails.userCollabCount} Co-labs</h4>
      </div>
      <div className="user-page-content">
        {userDetails.Tracks.length === 0 ? (
          <div>
            <h2>
              You don't have any tracks. Add some by clicking the 'Add Tracks'
              button{' '}
            </h2>
          </div>
        ) : viewColabs ? (
          <ViewCollabs
            userDetails={userDetails}
            allTracks={allTracks}
            activeUser={activeUser}
            setTrackDetails={setTrackDetails}
            authenticated={authenticated}
          />
        ) : (
          <UserAudioPlayer
            tracks={userDetails.Tracks}
            activeUser={activeUser}
            setTrackDetails={setTrackDetails}
            userDetails={userDetails}
            authenticated={authenticated}
          />
        )}
      </div>
      <div className="user-page-crud">
        <ul>
          <Link className="add-track-link" to={`/users/${userId}/addtrack`}>
            <li>Add Track</li>
          </Link>
          <Link
            className="create-colab-user-link"
            to={`/users/${userId}/createcolab`}
          >
            <li>Create Co-lab</li>
          </Link>

          <Link className="update-user-link" to={`/users/${userId}/update`}>
            <li>Update User</li>
          </Link>
          {userDetails.collabs.length > 0 ? (
            viewColabs ? (
              <li>
                <button
                  id="view-user-tracks"
                  onClick={() => setViewColabs(false)}
                >
                  View Tracks{' '}
                </button>
              </li>
            ) : (
              <li>
                <button
                  id="view-user-colabs"
                  onClick={() => setViewColabs(true)}
                >
                  View Co-labs
                </button>
              </li>
            )
          ) : (
            <div></div>
          )}
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
          <img
            id="visit-user-banner"
            src={userDetails.userBannerPic}
            alt={userDetails.userName}
          />
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
          <div className="visit-user-about">
            <div className="heading-font">
              about{' '}
              <span className="heading-alt-font">{userDetails.userName}</span>
            </div>
            <h4>
              {userDetails.userName} has been a part of{' '}
              {userDetails.userCollabCount} Co-labs
            </h4>
            <p>{userDetails.userAbout}</p>
          </div>
          <div
            className="user-spot-playlist"
            dangerouslySetInnerHTML={{ __html: userDetails.userSpotPlay }}
          ></div>
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
