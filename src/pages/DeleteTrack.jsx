import { useState } from 'react'
import { useNavigate } from 'react'

const DeleteTrack = ({
  userDetails,
  activeUser,
  authenticated,
  destroyTrack
}) => {
  const [selectedTrack, setSelectedTrack] = useState()

  const handleChange = (e) => {
    setSelectedTrack(e.target.value)
  }

  const handleSubmit = async () => {
    window.confirm(`Are you sure you want to delete ${selectedTrack.trackName}`)
      ? destroyTrack(selectedTrack)
      : console.log('canceled')
  }

  return (
    <div className="delete-track-wrapper">
      <div className="delete-track">
        <div className="input-wrapper">
          <label htmlFor="deleteTrack">Select the track to delete:</label>
          <select name="deleteTrack" onChange={handleChange}>
            <option value="select a track" disabled selected hidden>
              Select a track
            </option>
            {userDetails.Tracks.map((track) => (
              <option key={track.id} value={track.id}>
                {track.trackName}
              </option>
            ))}
          </select>
        </div>
        <button onClick={() => handleSubmit()}>Delete</button>
      </div>
    </div>
  )
}

export default DeleteTrack
