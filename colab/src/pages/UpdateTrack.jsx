import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UpdateTrackComp from '../components/UpdateTrackComp'

const UpdateTrack = ({
  genres,
  metadata,
  needs,
  activeUser,
  authenticated,
  trackDetails,
  setTrackDetails
}) => {
  const [trackGenres, setTrackGenres] = useState([])
  const [trackMetadata, setTrackMetadata] = useState([])
  const [trackNeeds, setTrackNeeds] = useState([])
  const [updateReady, setUpdateReady] = useState(false)
  const [formValues, setFormValues] = useState({
    trackName: '',
    trackDescription: '',
    trackAudio: '',
    trackArt: '',
    addNeeds: [],
    addGenres: [],
    addMetadata: [],
    removeNeeds: [],
    removeGenres: [],
    removeMetadata: [],
    userId: activeUser.id
  })

  useEffect(() => {
    const getTrackDetails = async () => {
      const response = await axios.get(
        `https://colabdb.herokuapp.com/api/tracks/${trackId}`
      )
      setTrackDetails(response.data)
    }

    if (genres) {
      setTrackGenres(new Array(genres.length).fill(false))
    }
    if (metadata) {
      setTrackMetadata(new Array(metadata.length).fill(false))
    }
    if (needs) {
      setTrackNeeds(new Array(needs.length).fill(false))
    }
    if (trackDetails) {
      setFormValues({
        ...formValues,
        trackName: trackDetails.trackName,
        trackDescription: trackDetails.trackDescription,
        trackAudio: trackDetails.trackAudio,
        trackArt: trackDetails.trackArt
      })
    }
    getTrackDetails()
  }, [genres, metadata, needs])

  let navigate = useNavigate()
  let { trackId } = useParams()

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
    let addGenreChoices = []
    let addMetadataChoices = []
    let addNeedsChoices = []
    let removeGenreChoices = []
    let removeMetadataChoices = []
    let removeNeedsChoices = []

    trackGenres.forEach((genre, i) => {
      if (genre) {
        addGenreChoices.push({ genreId: i + 1 })
      } else if (!genre) {
        removeGenreChoices.push({ genreId: i + 1 })
      }
    })

    trackMetadata.forEach((data, i) => {
      if (data) {
        addMetadataChoices.push({ metadataId: i + 1 })
      } else if (!data) {
        removeMetadataChoices.push({ metadataId: i + 1 })
      }
    })

    trackNeeds.forEach((need, i) => {
      if (need) {
        addNeedsChoices.push({ needId: i + 1 })
      } else if (!need) {
        removeNeedsChoices.push({ needId: i + 1 })
      }
    })
    setFormValues({
      ...formValues,
      addNeeds: addNeedsChoices,
      addGenres: addGenreChoices,
      addMetadata: addMetadataChoices,
      removeNeeds: removeNeedsChoices,
      removeGenres: removeGenreChoices,
      removeMetadata: removeMetadataChoices
    })
    setUpdateReady(true)
  }

  return genres && needs && metadata && trackDetails ? (
    updateReady ? (
      <UpdateTrackComp
        formValues={formValues}
        setUpdateReady={setUpdateReady}
      />
    ) : (
      <div className="add-track-wrapper">
        <div className="add-track-form-wrapper">
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
                    value={need.metadataName}
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
  ) : (
    <div>Loading...</div>
  )
}

export default UpdateTrack
