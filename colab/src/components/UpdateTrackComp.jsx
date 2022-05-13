import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateTrackComp = ({ formValues, setUpdateReady }) => {
  let { trackId, userId } = useParams()
  let navigate = useNavigate()
  const update = async () => {
    await axios.put(
      `https://colabdb.herokuapp.com/api/tracks/${trackId}`,
      formValues
    )
    navigate(`/users/${userId}`)
  }

  return (
    <div className="add-track-confirm-wrapper">
      <div className="add-track-confirm-title">
        <button onClick={() => update()}>update</button>
        <button onClick={() => setUpdateReady(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default UpdateTrackComp
