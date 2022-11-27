import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

const CreateColab = ({ activeUser, authenticated, userDetails }) => {
  let { userId } = useParams()

  // const [createColab, setCreateColab] = useState(false)
  const [formValues, setFormValues] = useState({
    colabCreator: activeUser.id,
    colabAdd: '',
    colabTrack: 'Please select a track'
  })

  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let users = []
    users.push({ userId: formValues.colabCreator })
    users.push({ userId: formValues.colabAdd })
    await axios.post(
      `https://co-lab-backend-production.up.railway.app/api/collabs/${formValues.colabTrack}`,
      { users: users }
    )
    navigate(`/users/${userId}`)
  }

  return (
    userDetails && (
      <div className="add-collab-wrapper">
        <div className="add-collab-form-wrapper">
          <div className="heading-font">add a</div>
          <div className="heading-alt-font">Colab</div>
          <form
            className="add-collab-form"
            id="add-collab"
            onSubmit={handleSubmit}
          >
            <div className="input-wrapper">
              <label htmlFor="colabTrack">
                Select the track to make a co-lab for.
              </label>
              <select name="colabTrack" onChange={handleChange}>
                <option value="" disabled selected hidden>
                  Select Track
                </option>
                {userDetails.Tracks.map((track) => (
                  <option value={track.id}>{track.trackName}</option>
                ))}
              </select>
            </div>
            <div className="input-wrapper">
              <label htmlFor="colabAdd">
                Enter the co-lab code of the user you would like to collaborate
                with.
              </label>
              <input
                onChange={handleChange}
                name="colabAdd"
                type="number"
                min="1"
              />
            </div>
            <div className="form-buttons">
              <button type="Submit">Submit</button>
              <button onClick={() => navigate(`/users/${userId}`)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  )
}

export default CreateColab
