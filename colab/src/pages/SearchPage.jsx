import { useState, useEffect } from 'react'
import axios from 'axios'
import UserAudioPlayer from '../components/UserAudioPlayer'

const SearchPage = ({
  genres,
  metadata,
  needs,
  activeUser,
  authenticated,
  setTrackDetails,
  destroyTrack
}) => {
  const [trackGenres, setTrackGenres] = useState([])
  const [trackMetadata, setTrackMetadata] = useState([])
  const [trackNeeds, setTrackNeeds] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [formValues, setFormValues] = useState({
    needs: [],
    genres: [],
    metadata: []
  })

  const [textSearch, setTextSearch] = useState('')
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
        trackSearchChoices.push(`&genres=${i + 1}`)
      }
    })

    trackMetadata.forEach((data, i) => {
      if (data) {
        trackSearchChoices.push(`&metadata=${i + 1}`)
      }
    })

    trackNeeds.forEach((need, i) => {
      if (need) {
        trackSearchChoices.push(`&needs=${i + 1}`)
      }
    })
    let searchQuery = trackSearchChoices.join('')
    const response = await axios.get(
      `https://colabdb.herokuapp.com/api/tracks/search/data?${searchQuery}`
    )
    setSearchResults(response.data)
  }

  const handleTextChange = (e) => {
    setTextSearch(e.target.value)
  }

  const handleTextSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.get(
      `https://colabdb.herokuapp.com/api/tracks/search/data/input?word=${textSearch}`
    )
    setSearchResults(response.data)
  }

  return (
    <div className="search-page-wrapper">
      <form className="search-options" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="trackGenres">Genres</label>
          <ul>
            {genres.map((genre, i) => (
              <li className="genre-checkbox" key={i}>
                {genre.genreName}
                <input
                  name={genre.genreName}
                  type="checkbox"
                  value={genre.genreName}
                  checked={trackGenres[i]}
                  onChange={() => handleGenreChange(i)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="input-wrapper">
          <label htmlFor="trackMetadata">Metadata</label>
          <ul>
            {metadata.map((data, i) => (
              <li className="metadata-checkbox" key={i}>
                {data.metadataName}
                <input
                  name={data.metadataName}
                  type="checkbox"
                  value={data.metadataName}
                  checked={trackMetadata[i]}
                  onChange={() => handleMetadataChange(i)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="input-wrapper">
          <label htmlFor="trackNeeds">Needs</label>
          <ul>
            {needs.map((need, i) => (
              <li className="need-checkbox" key={i}>
                {need.needName}
                <input
                  name={need.metadataName}
                  type="checkbox"
                  value={need.metadataName}
                  checked={trackNeeds[i]}
                  onChange={() => handleNeedChange(i)}
                />
              </li>
            ))}
          </ul>
        </div>
        <button type="Submit">Search</button>
      </form>
      <div className="search-results-wrapper">
        <form className="text-search" onSubmit={handleTextSubmit}>
          <div className="input-wrapper text-search-input">
            <input
              onChange={handleTextChange}
              name="textSearch"
              type="text"
              value={textSearch}
            />
          </div>
          <button className="text-search-submit" type="Submit">
            <i className="fa-solid fa-compact-disc" title="search"></i>
          </button>
        </form>
        <h2>Search Results</h2>
        {searchResults.length > 0 ? (
          <div className="search-results">
            <UserAudioPlayer
              tracks={searchResults}
              activeUser={activeUser}
              setTrackDetails={setTrackDetails}
              destroyTrack={destroyTrack}
            />
          </div>
        ) : (
          <div className="no-search-results">
            <h3>There are no results</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage
