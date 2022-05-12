import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateTrackComp = ({ formValues, setUpdateReady }) => {
  let { trackId, userId } = useParams()
  let navigate = useNavigate()
  const update = async () => {
    console.log('update values', formValues)
    // await axios.put(`http://localhost:3001/api/tracks/${trackId}`, formValues)
    // navigate(`/users/${activeUser.id}`)
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
