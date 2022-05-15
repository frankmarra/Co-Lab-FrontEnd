import { useState } from 'react'
import { useNavigate } from 'react'

const DeleteTrack = ({
  userTracks,
  activeUser,
  authenticated,
  destroyTrack
}) => {
  const [selectedTrack, setSelectedTrack] = useState()

  const handleChange = (e) => {
    setSelectedTrack(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    destroyTrack(selectedTrack)
  }

  return (
    <div className="delete-track-wrapper">
      <div className="delete-track">
        <div className="input-wrapper">
          <label htmlFor="deleteTrack">Select the track to delete:</label>
          <select name="deleteTrack" onChange={handleChange}>
            <option value="" disabled selected hidden>
              Select a track
            </option>
            {userTracks.map((track) => (
              <option value={track.id}>{track.trackName}</option>
            ))}
          </select>
        </div>
        <button onClick={() => handleSubmit()}>Delete</button>
      </div>
    </div>
  )
}

export default DeleteTrack
