import { useState, useEffect } from 'react'
import SearchFilters from '../components/SearchFilters'
import axios from 'axios'

const SearchPage = ({
  genres,
  metadata,
  needs,
  setGenres,
  setMetadata,
  setNeeds
}) => {
  const [searchTracks, setSearchTracks] = useState([])

  useEffect(() => {
    const getGenres = async () => {
      const response = await axios.get(`http://localhost:8000/genres`)
      setGenres(response.data)
    }
    const getMetadata = async () => {
      const response = await axios.get(`http://localhost:8000/metadata`)
      setMetadata(response.data)
    }
    const getNeeds = async () => {
      const response = await axios.get(`http://localhost:8000/needs`)
      setNeeds(response.data)
    }

    getGenres()
    getMetadata()
    getNeeds()
  }, [])

  return (
    genres && (
      <div className="search-page-wrapper">
        <SearchFilters genres={genres} metadata={metadata} needs={needs} />
      </div>
    )
  )
}

export default SearchPage

// <div className="search-page-choices">
//   {genres.map((genre) => (
//     <div className="genre-search-menu">
//       <div className="genre-name">{genre.genreName}</div>
//       <div className="genre-total">{genre.tracks.length}</div>
//     </div>
//   ))}
// </div>
