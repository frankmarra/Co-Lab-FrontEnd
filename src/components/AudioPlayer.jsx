import ReactPlayer from 'react-player/lazy'
import { useNavigate, Link } from 'react-router-dom'
import TrackGenres from './TrackGenres'
import TrackMetadata from './TrackMetadata'
import TrackNeeds from './TrackNeeds'

const AudioPlayer = ({
  track,
  activeUser,
  setTrackDetails,
  userDetails,
  authenticated
}) => {
  let navigate = useNavigate()

  return track && authenticated ? (
    <div className="player-wrapper">
      <div className="player-track-title">
        <h3>{track.trackName}</h3>
      </div>
      <div className="player-track-pic-description">
        <img src={track.trackArt} alt={track.trackName} />
        <p>{track.trackDescription}</p>
      </div>
      <div className="play-track-update-details">
        {activeUser.id === track.userId ? (
          <div className="update-track-link">
            <button
              onClick={() => {
                setTrackDetails(track)
                navigate(`/users/${activeUser.id}/updatetrack/${track.id}`)
              }}
            >
              <i className="fa-solid fa-sliders"></i>
            </button>
          </div>
        ) : userDetails ? (
          <div className="link-to-user-page">
            <h3>
              Track by:{' '}
              <span>
                <Link className="user-page-link" to={`/users/${track.userId}`}>
                  {userDetails.userName}
                </Link>
              </span>
            </h3>
            <h3>
              Ask to colab:{' '}
              <span>
                <a
                  href={`mailto:${userDetails.userEmail}?subject=Let's%20Co-lab&body=Hello%20${userDetails.userName},%0D%0AThis is ${activeUser.userName}.  I heard your track ${track.trackName} and would like to help you finish it.%20%20My ID%20is%20${activeUser.id}.`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-solid fa-envelope-open-text"></i>
                </a>
              </span>
            </h3>
          </div>
        ) : (
          <div className="link-to-user-page">
            <h3>
              Track by:{' '}
              <span>
                <Link className="user-page-link" to={`/users/${track.userId}`}>
                  {track.userTrack.userName}
                </Link>
              </span>
            </h3>
            <h3>
              Ask to colab:{' '}
              <span>
                <a
                  href={`mailto:${track.userTrack.userEmail}?subject=Let's Co-lab&body=Hello ${track.userTrack.userName},%0D%0A This is ${activeUser.userName}.  I heard your track ${track.trackName} and would like to help you finish it.%20%20My%20Co-lab%20ID%20is%20${activeUser.id}.`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-solid fa-envelope-open-text"></i>
                </a>
              </span>
            </h3>
          </div>
        )}
        <div className="player-track-data">
          <ul className="player-track-genres">
            <span className="label">Genres</span>
            <TrackGenres track={track} />
          </ul>
          <ul className="player-track-metadata">
            <span className="label">Moods</span>
            <TrackMetadata track={track} />
          </ul>
          <ul className="player-track-needs">
            <span className="label">Needs</span>
            <TrackNeeds track={track} />
          </ul>
        </div>
      </div>
      <div className="react-player-wrapper">
        <ReactPlayer
          url={track.trackAudio}
          className="react-player"
          controls={true}
          height="100%"
          width="100%"
          config={{
            file: {
              forceAudio: true
            }
          }}
        />
      </div>
    </div>
  ) : track ? (
    <div className="player-wrapper">
      <div className="player-track-title">
        <h3>{track.trackName}</h3>
      </div>
      <div className="player-track-pic-description">
        <img src={track.trackArt} alt={track.trackName} />
        <p>{track.trackDescription}</p>
      </div>
      <div className="play-track-update-details">
        {activeUser.id === track.userId ? (
          <div className="update-track-link">
            <button
              onClick={() => {
                setTrackDetails(track)
                navigate(`/users/${activeUser.id}/updatetrack/${track.id}`)
              }}
            >
              <i className="fa-solid fa-sliders"></i>
            </button>
          </div>
        ) : userDetails ? (
          <div className="link-to-user-page">
            <h3>
              Track by:{' '}
              <span>
                <Link className="user-page-link" to={`/users/${track.userId}`}>
                  {userDetails.userName}
                </Link>
              </span>
            </h3>
          </div>
        ) : (
          <div className="link-to-user-page">
            <h3>
              Track by:{' '}
              <span>
                <Link className="user-page-link" to={`/users/${track.userId}`}>
                  {track.userTrack.userName}
                </Link>
              </span>
            </h3>
          </div>
        )}
        <div className="player-track-data">
          <ul className="player-track-genres">
            <span className="label">Genres</span>
            <TrackGenres track={track} />
          </ul>
          <ul className="player-track-metadata">
            <span className="label">Moods</span>
            <TrackMetadata track={track} />
          </ul>
          <ul className="player-track-needs">
            <span className="label">Needs</span>
            <TrackNeeds track={track} />
          </ul>
        </div>
      </div>
      <div className="react-player-wrapper">
        <ReactPlayer
          url={track.trackAudio}
          className="react-player"
          controls={true}
          height="100%"
          width="100%"
          config={{
            file: {
              forceAudio: true
            }
          }}
        />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default AudioPlayer
