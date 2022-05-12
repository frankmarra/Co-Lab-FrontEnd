import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchPage = ({ genres, metadata, needs, activeUser, authenticated }) => {
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
    needs: [],
    genres: [],
    metadata: []
  })
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
    let trackSearchChoices = []
    trackGenres.forEach((genre, i) => {
      if (genre) {
        trackSearchChoices.push(`&genre=${i + 1}`)
      }
    })

    trackMetadata.forEach((data, i) => {
      if (data) {
        trackSearchChoices.push(`&metadata=${i + 1}`)
      }
    })

    trackNeeds.forEach((need, i) => {
      if (need) {
        trackSearchChoices.push(`&need=${i + 1}`)
      }
    })
    let searchQuery = trackSearchChoices.join('')
    await axios.get(
      `http://localhost:3001/api/tracks/search/data?${searchQuery}`
    )
  }

  return (
    <div className="search-page-wrapper">
      <form className="search-options" onSubmit={handleSubmit}>
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
        <button type="Submit">Search</button>
      </form>
    </div>
  )
}

export default SearchPage
