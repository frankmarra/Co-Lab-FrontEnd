import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import AudioPlayerPreview from './AudioPlayerPreview'

const DeleteTrackComp = ({
  setDeleteReady,
  genres,
  metadata,
  needs,
  userDetails,
  activeUser,
  track
}) => {
  let { userId } = useParams()
  let navigate = useNavigate()

  const destroyTrack = async (trackId) => {
    await axios.delete(`https://colabdb.herokuapp.com/api/tracks/${trackId}`)
    navigate(`/users/${activeUser.id}`)
  }

  return (
    track && (
      <div className="delete-track-confirm-wrapper">
        <h2>You are about to delete this track.</h2>
        <AudioPlayerPreview
          track={track}
          activeUser={activeUser}
          userDetails={userDetails}
          genres={genres}
          metadata={metadata}
          needs={needs}
        />
        <div className="delete-track-confirm-buttons">
          <button onClick={() => destroyTrack(track.id)}>Delete</button>
          <button onClick={() => setDeleteReady(false)}>Cancel</button>
        </div>
      </div>
    )
  )
}

export default DeleteTrackComp
