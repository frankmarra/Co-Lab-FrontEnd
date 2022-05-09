import SearchFilterChoice from './SearchFilterChoice'

const SearchFilters = ({ genres, needs, metadata }) => {
  return (
    <div className="search-page-choices">
      <h3>Search Filters:</h3>
      <form className="search-choices">
        <h4>Genres:</h4>
        <ul id="genre-search-dropdown">
          {genres.map((genre) => (
            <SearchFilterChoice
              name={genre.genreName}
              tracks={genre.tracks}
              key={genre.id}
            />
          ))}
        </ul>
        <h4>Needs:</h4>
        <ul id="needs-search-dropdown">
          {needs.map((need) => (
            <SearchFilterChoice
              name={need.needName}
              tracks={need.tracks}
              key={need.id}
            />
          ))}
        </ul>
        <h4>Metadata:</h4>
        <ul id="metadata-search-dropdown">
          {metadata.map((data) => (
            <SearchFilterChoice
              name={data.metadataName}
              tracks={data.tracks}
              key={data.id}
            />
          ))}
        </ul>
      </form>
    </div>
  )
}

export default SearchFilters
