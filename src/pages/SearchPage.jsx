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
      `https://co-lab-backend-production.up.railway.app/api/tracks/search/data?${searchQuery}`
    )
    setSearchResults(response.data)
  }

  const handleTextChange = (e) => {
    setTextSearch(e.target.value)
  }

  const handleTextSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.get(
      `https://co-lab-backend-production.up.railway.app/api/tracks/search/data/input?word=${textSearch}`
    )
    setSearchResults(response.data)
    setTrackGenres(new Array(genres.length).fill(false))
    setTrackMetadata(new Array(genres.length).fill(false))
    setTrackNeeds(new Array(genres.length).fill(false))
  }

  return genres && metadata && needs ? (
    <div className="search-page-wrapper">
      <span className="label">Explore by</span>
      <form className="search-options" onSubmit={handleSubmit}>
        <ul className="input-wrapper search-genres">
          <span className="label">Genres</span>
          {genres.map((genre, i) => (
            <li className="genre-checkbox" key={i}>
              <input
                name={genre.genreName}
                type="checkbox"
                value={genre.genreName}
                checked={trackGenres[i]}
                onChange={() => handleGenreChange(i)}
              />
              <label htmlFor={genre.genreName}>{genre.genreName}</label>
            </li>
          ))}
        </ul>
        <ul className="input-wrapper search-metadata">
          <span className="label">Moods</span>
          {metadata.map((data, i) => (
            <li className="metadata-checkbox" key={i}>
              <input
                name={data.metadataName}
                type="checkbox"
                value={data.metadataName}
                checked={trackMetadata[i]}
                onChange={() => handleMetadataChange(i)}
              />
              <label htmlFor={data.metadataName}>{data.metadataName}</label>
            </li>
          ))}
        </ul>
        <ul className="input-wrapper search-needs">
          <span className="label">Needs</span>
          {needs.map((need, i) => (
            <li className="need-checkbox" key={i}>
              <input
                name={need.needName}
                type="checkbox"
                value={need.needName}
                checked={trackNeeds[i]}
                onChange={() => handleNeedChange(i)}
              />
              <label htmlFor={need.needName}>{need.needName}</label>
            </li>
          ))}
        </ul>

        <button type="Submit">
          <i className="fa-solid fa-compact-disc fa-spin" title="search"></i>
          Apply
        </button>
      </form>

      <div className="search-results-wrapper">
        <form className="text-search" onSubmit={handleTextSubmit}>
          <div className="input-wrapper text-search-input">
            <input
              onChange={handleTextChange}
              name="textSearch"
              type="text"
              value={textSearch}
              placeholder="search by track name"
            />
          </div>
          <button className="text-search-submit" type="Submit">
            <i className="fa-solid fa-compact-disc fa-spin" title="search"></i>
          </button>
        </form>
        <h2>Search Results</h2>
        {searchResults != [] && searchResults.length > 0 ? (
          <div className="search-results">
            <UserAudioPlayer
              tracks={searchResults}
              activeUser={activeUser}
              setTrackDetails={setTrackDetails}
              authenticated={authenticated}
            />
          </div>
        ) : (
          <div className="no-search-results">
            <h3>There are no results</h3>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default SearchPage
