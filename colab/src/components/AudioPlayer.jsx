import ReactPlayer from 'react-player/lazy'
import { useNavigate, Link } from 'react-router-dom'
import TrackGenres from './TrackGenres'
import TrackMetadata from './TrackMetadata'
import TrackNeeds from './TrackNeeds'

const AudioPlayer = ({ track, activeUser, setTrackDetails, userDetails }) => {
  let navigate = useNavigate()

  // const showGenres = () => {
  //   if (track.genres == []) {
  //     return <div className="player-track-genres">No Genres Picked</div>
  //   } else if (typeof track.genres === 'object') {
  //     return (
  //       <ul className="player-track-genres">
  //         <li>{track.genres.genreName}</li>
  //       </ul>
  //     )
  //   } else {
  //     return (
  //       <ul className="player-track-genres">
  //         {track.genres.map((genre) => (
  //           <li>{genre.genreName}</li>
  //         ))}
  //       </ul>
  //     )
  //   }
  // }

  return track ? (
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
        <h4>Track info</h4>
        <div className="player-track-data">
          <ul className="player-track-genres">
            <span className="label">Genres</span>
            <TrackGenres track={track} />
          </ul>
          <ul className="player-track-metadata">
            <li>Moods</li>
            <TrackMetadata track={track} />
          </ul>
          <ul className="player-track-needs">
            <li>Needs</li>
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
    <div></div>
  )
}

export default AudioPlayer

// <button
//                 onClick={() =>
//                   window.confirm(
//                     `Are you sure you want to delete ${track.trackName}?`
//                   )
//                     ? destroyTrack(track.id)
//                     : console.log('canceled')
//                 }
//               >
//                 Delete
//               </button>
