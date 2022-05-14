import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddTrackComp from '../components/AddTrackComp'

const AddTrack = ({ genres, metadata, needs, activeUser, authenticated }) => {
  //See ReadMe for site that helped with setting default state logic:
  const [trackGenres, setTrackGenres] = useState([])
  const [trackMetadata, setTrackMetadata] = useState([])
  const [trackNeeds, setTrackNeeds] = useState([])
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
  const [createReady, setCreateReady] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    if (genres) {
      setTrackGenres(new Array(genres.length).fill(false))
    }
    if (metadata) {
      setTrackMetadata(new Array(metadata.length).fill(false))
    }
    if (needs) {
      setTrackNeeds(new Array(needs.length).fill(false))
    }
  }, [genres, metadata, needs])

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  //See ReadMe for site I used to help with this logic:
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
    setCreateReady(true)
  }

  return genres && metadata && needs ? (
    createReady ? (
      <AddTrackComp formValues={formValues} setCreateReady={setCreateReady} />
    ) : (
      <div className="add-track-wrapper">
        <div className="add-track-form-wrapper">
          <div className="heading-font">add a</div>
          <div className="heading-alt-font">Track</div>
          <form
            className="add-track-form"
            id="add-track"
            onSubmit={handleSubmit}
          >
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
                rows="4"
                cols="50"
              >
                This is optional
              </textarea>
            </div>
            <div className="descriptor-wrapper">
              <ul className="input-wrapper add-track-genres">
                <span className="label" htmlFor="trackGenres">
                  Genres
                </span>
                {genres.map((genre, i) => (
                  <li className="genre-checkbox" key={i}>
                    <input
                      type="checkbox"
                      value={genre.genreName}
                      checked={trackGenres[i]}
                      onChange={() => handleGenreChange(i)}
                    />
                    <label htmlFor={genre.genreName}>{genre.genreName}</label>
                  </li>
                ))}
              </ul>
              <ul className="input-wrapper add-track-metadata">
                <span className="label" htmlFor="trackMetadata">
                  Moods
                </span>
                {metadata.map((data, i) => (
                  <li className="metadata-checkbox" key={i}>
                    <input
                      type="checkbox"
                      value={data.metadataName}
                      checked={trackMetadata[i]}
                      onChange={() => handleMetadataChange(i)}
                    />
                    <label htmlFor={data.metadataName}>
                      {data.metadataName}
                    </label>
                  </li>
                ))}
              </ul>
              <ul className="input-wrapper add-track-needs">
                <span className="label" htmlFor="trackNeeds">
                  Needs
                </span>
                {needs.map((need, i) => (
                  <li className="need-checkbox" key={i}>
                    <input
                      type="checkbox"
                      value={need.needName}
                      checked={trackNeeds[i]}
                      onChange={() => handleNeedChange(i)}
                    />
                    <label htmlFor={need.needName}>{need.needName}</label>
                  </li>
                ))}
              </ul>
            </div>
            <button type="Submit">Submit</button>
            <button onClick={() => navigate(`/users/${activeUser.id}`)}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  ) : (
    <div>Loading...</div>
  )
}

export default AddTrack
