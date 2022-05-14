import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import AudioPlayerPreview from './AudioPlayerPreview'

const UpdateTrackComp = ({
  formValues,
  setUpdateReady,
  genres,
  metadata,
  needs,
  userDetails,
  activeUser,
  track
}) => {
  let { trackId, userId } = useParams()
  let navigate = useNavigate()
  const updateTrack = async () => {
    await axios.put(
      `https://colabdb.herokuapp.com/api/tracks/${trackId}`,
      formValues
    )
    navigate(`/users/${userId}`)
  }

  return (
    <div className="update-track-confirm-wrapper">
      <h2>You are about to update this track. Look good?</h2>
      <AudioPlayerPreview
        track={track}
        activeUser={activeUser}
        userDetails={userDetails}
        genres={genres}
        metadata={metadata}
        needs={needs}
      />
      <div className="update-track-confirm-buttons">
        <button onClick={() => updateTrack()}>update</button>
        <button onClick={() => setUpdateReady(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default UpdateTrackComp
