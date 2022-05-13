import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

const CreateColab = ({ activeUser, authenticated, userTracks }) => {
  let { userId } = useParams()

  // const [createColab, setCreateColab] = useState(false)
  const [formValues, setFormValues] = useState({
    colabCreator: userId,
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
      `https://colabdb.herokuapp.com/api/collabs/${formValues.colabTrack}`,
      { users: users }
    )
    navigate(`/users/${userId}`)
  }

  return (
    <div className="add-collab-wrapper">
      <div className="add-collab-form-wrapper">
        <form className="add-collab-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="colabTrack">
              Select the track to make a co-lab for.
            </label>
            <select name="colabTrack" onChange={handleChange}>
              <option value="" disabled selected hidden>
                Select Track
              </option>
              {userTracks.map((track) => (
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
          <button type="Submit">Submit</button>
        </form>
        <button onClick={() => navigate(`/users/${userId}`)}>Cancel</button>
      </div>
    </div>
  )
}

export default CreateColab
