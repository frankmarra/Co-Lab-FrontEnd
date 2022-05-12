import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const AddTrackComp = ({ formValues, setCreateReady }) => {
  let { userId } = useParams()
  let navigate = useNavigate()
  const update = async () => {
    await axios.post(`http://localhost:3001/api/tracks/${userId}`, formValues)
    navigate(`/users/${userId}`)
  }

  return (
    <div className="add-track-confirm-wrapper">
      <div className="add-track-confirm-info">
        <h3>You are about to create a track with these settings.</h3>
        <ul>
          <li>Name: {formValues.trackName}</li>
          <li>Audio link: {formValues.trackAudio}</li>
          <li>Art link: {formValues.trackArt}</li>
          <li>Description: {formValues.trackDescription}</li>
          <li>
            Genres:{' '}
            {formValues.genres.map((genre) => {
              return genre.genreId
            })}
          </li>
          <li>
            Metadata:{' '}
            {formValues.metadata.map((data) => {
              return data.metadataId
            })}
          </li>
          <li>
            Needs:{' '}
            {formValues.needs.map((need) => {
              return need.needId
            })}
          </li>
        </ul>
      </div>
      <div className="add-track-confirm-buttons">
        <button onClick={() => update()}>Create</button>
        <button onClick={() => setCreateReady(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default AddTrackComp
