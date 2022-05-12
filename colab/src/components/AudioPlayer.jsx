import ReactPlayer from 'react-player/lazy'
import { useNavigate } from 'react-router-dom'

const AudioPlayer = ({ track, activeUser, setTrackDetails }) => {
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
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <ReactPlayer
        url={track.trackAudio}
        controls={true}
        height="50px"
        config={{
          file: {
            forceAudio: true
          }
        }}
      />
    </div>
  ) : (
    <div></div>
  )
}

export default AudioPlayer