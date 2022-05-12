import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddTrack = ({ genres, metadata, needs, activeUser, authenticated }) => {
  const [trackGenres, setTrackGenres] = useState(
    new Array(genres.length).fill(false)
  )
  const [trackMetadata, setTrackMetadata] = useState([])
  const [trackneeds, setTrackNeeds] = useState([])

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

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleGenreChange = (i) => {
    let updateGenre = trackGenres.forEach((genre, index) =>
      i === index ? !genre : genre
    )
    setTrackGenres(updateGenre)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('form value: ', formValues)
    // await axios.post(`http://localhost:3001/api/tracks/${userId}`, formValues)
  }

  return (
    <div className="add-track-wrapper">
      <div className="add-track-form-wrapper">
        <form className="add-track-form" id="add-track" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="trackName">Track Name</label>
            <input
              onChange={handleChange}
              name="trackName"
              type="text"
              value={formValues.trackName}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="trackAudio">Track Audio Link</label>
            <input
              onChange={handleChange}
              name="trackAudio"
              type="text"
              value={formValues.trackAudio}
              placeholder="http://www.example.com/example.mp3"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="trackArt">Track Art Link</label>
            <input
              onChange={handleChange}
              name="trackArt"
              type="text"
              value={formValues.trackAudio}
              placeholder="optional"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="trackDescription">Track Description</label>
            <textarea
              onChange={handleChange}
              name="trackDescription"
              value={formValues.trackDescription}
              placeholder="optional"
              form="add-track"
            >
              This is optional
            </textarea>
          </div>
          <div className="input-wrapper">
            <label htmlFor="trackGenres">Genres</label>
            {genres.map((genre, i) => {
              ;<select
                key={i}
                name={genre.genreName}
                type="checkbox"
                value={genre.id}
                checked={trackGenres[i]}
                onChange={() => handleGenreChange(i)}
              />
            })}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTrack
