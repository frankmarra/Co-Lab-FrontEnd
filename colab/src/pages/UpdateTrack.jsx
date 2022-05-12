import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateTrack = ({
  genres,
  metadata,
  needs,
  activeUser,
  authenticated,
  trackDetails
}) => {
  const [trackGenres, setTrackGenres] = useState(
    new Array(genres.length).fill(false)
  )
  const [trackMetadata, setTrackMetadata] = useState(
    new Array(metadata.length).fill(false)
  )
  const [trackNeeds, setTrackNeeds] = useState(
    new Array(needs.length).fill(false)
  )

  const [formValues, setFormValues] = useState({
    trackName: '',
    trackDescription: '',
    trackAudio: '',
    trackArt: '',
    needs: [],
    genres: [],
    metadata: [],
    userId: activeUser.id
  })
  let navigate = useNavigate()
  let { trackId } = useParams()

  return <div></div>
}

export default UpdateTrack
