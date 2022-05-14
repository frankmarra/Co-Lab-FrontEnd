import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import AudioPlayerPreview from './AudioPlayerPreview'

const AddTrackComp = ({
  formValues,
  setCreateReady,
  genres,
  metadata,
  needs,
  userDetails,
  activeUser
}) => {
  let { userId } = useParams()
  let navigate = useNavigate()
  const createTrack = async () => {
    await axios.post(
      `https://colabdb.herokuapp.com/api/tracks/${userId}`,
      formValues
    )
    navigate(`/users/${userId}`)
  }

  return (
    <div className="add-track-confirm-wrapper">
      <h2>You are about to create this track. Look good?</h2>
      <AudioPlayerPreview
        track={formValues}
        activeUser={activeUser}
        userDetails={userDetails}
        genres={genres}
        metadata={metadata}
        needs={needs}
      />
      <div className="add-track-confirm-buttons">
        <button onClick={() => createTrack()}>Create</button>
        <button onClick={() => setCreateReady(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default AddTrackComp
