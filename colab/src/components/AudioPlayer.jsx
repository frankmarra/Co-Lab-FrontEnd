import ReactPlayer from 'react-player/lazy'
import { useNavigate } from 'react-router-dom'

const AudioPlayer = ({ track, activeUser, setTrackDetails, destroyTrack }) => {
  let navigate = useNavigate()
  return track ? (
    <div className="player-wrapper">
      <div className="player-track-title">
        <h3>{track.trackName}</h3>
      </div>
      <div className="player-track-pic-description">
        <img src={track.trackArt} alt={track.trackName} />
        <p>{track.trackDescription}</p>
        {activeUser.id === track.userId ? (
          <div className="update-track-link">
            <button
              onClick={() => {
                setTrackDetails(track)
                navigate(`/users/${activeUser.id}/updatetrack/${track.id}`)
              }}
            >
              Update
            </button>
            <div className="delete-track-link"></div>
          </div>
        ) : (
          <div></div>
        )}
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
