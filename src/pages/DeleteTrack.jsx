import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteTrackComp from '../components/DeleteTrackComp'

const DeleteTrack = ({
  userDetails,
  activeUser,
  authenticated,
  genres,
  metadata,
  needs
}) => {
  const [selectedTrack, setSelectedTrack] = useState()
  const [deleteReady, setDeleteReady] = useState(false)
  const [trackToDelete, setTrackToDelete] = useState()

  let navigate = useNavigate()
  const handleChange = (e) => {
    setSelectedTrack(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    userDetails.Tracks.forEach((track) => {
      if (track.id == selectedTrack) {
        console.log(track)
        setTrackToDelete(track)
      }
    })
    setDeleteReady(true)
  }

  return deleteReady ? (
    <DeleteTrackComp
      track={trackToDelete}
      genres={genres}
      metadata={metadata}
      needs={needs}
      userDetails={userDetails}
      activeUser={activeUser}
      setDeleteReady={setDeleteReady}
    />
  ) : (
    <div className="delete-track-wrapper">
      <div className="delete-track-form-wrapper">
        <div className="heading-font">delete a</div>
        <div className="heading-alt-font">Track</div>
        <form
          className="delete-track-form"
          id="delete-track"
          onSubmit={handleSubmit}
        >
          <div className="input-wrapper delete-track-input">
            <label htmlFor="deleteTrack">Select track</label>
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
          <div className="form-buttons delete-track-buttons">
            <button type="submit">Delete</button>
            <button
              type="button"
              onClick={() => navigate(`/users/${activeUser.id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DeleteTrack
