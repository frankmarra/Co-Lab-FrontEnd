import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddTrack = ({ genres, metadata, needs, activeUser, authenticated }) => {
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

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleGenreChange = (i) => {
    let updateGenres = trackGenres.map((genre, index) =>
      i === index ? !genre : genre
    )
    setTrackGenres(updateGenres)
  }

  const handleMetadataChange = (i) => {
    let updateMetadata = trackMetadata.map((data, index) =>
      i === index ? !data : data
    )
    setTrackMetadata(updateMetadata)
  }

  const handleNeedChange = (i) => {
    let updateNeeds = trackNeeds.map((need, index) =>
      i === index ? !need : need
    )
    setTrackNeeds(updateNeeds)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let trackGenreChoices = []
    let trackMetadataChoices = []
    let trackNeedsChoices = []
    trackGenres.forEach((genre, i) => {
      if (genre) {
        trackGenreChoices.push({ genreId: i + 1 })
      }
    })

    trackMetadata.forEach((data, i) => {
      if (data) {
        trackMetadataChoices.push({ metadataId: i + 1 })
      }
    })
    console.log(formValues)

    trackNeeds.forEach((need, i) => {
      if (need) {
        trackNeedsChoices.push({ needId: i + 1 })
      }
    })
    setFormValues({
      ...formValues,
      needs: trackNeedsChoices,
      genres: trackGenreChoices,
      metadata: trackMetadataChoices
    })
    await axios.post(
      `http://localhost:3001/api/tracks/${activeUser.id}`,
      formValues
    )
    navigate(`/users/${activeUser.id}`)
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
              value={formValues.trackArt}
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
            {genres.map((genre, i) => (
              <div className="genre-checkbox" key={i}>
                {genre.genreName}
                <input
                  name={genre.genreName}
                  type="checkbox"
                  value={genre.genreName}
                  checked={trackGenres[i]}
                  onChange={() => handleGenreChange(i)}
                />
              </div>
            ))}
          </div>
          <div className="input-wrapper">
            <label htmlFor="trackMetadata">Metadata</label>
            {metadata.map((data, i) => (
              <div className="metadata-checkbox" key={i}>
                {data.metadataName}
                <input
                  name={data.metadataName}
                  type="checkbox"
                  value={data.metadataName}
                  checked={trackMetadata[i]}
                  onChange={() => handleMetadataChange(i)}
                />
              </div>
            ))}
          </div>
          <div className="input-wrapper">
            <label htmlFor="trackNeeds">Needs</label>
            {needs.map((need, i) => (
              <div className="need-checkbox" key={i}>
                {need.needName}
                <input
                  name={need.metadataName}
                  type="checkbox"
                  value={need.meatadataName}
                  checked={trackNeeds[i]}
                  onChange={() => handleNeedChange(i)}
                />
              </div>
            ))}
          </div>
          <button type="Submit">Submit</button>
        </form>
        <button onClick={() => navigate(`/users/${activeUser.id}`)}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddTrack
