const TrackGenres = ({ track }) => {
  if (track.genres === []) {
    return <li>No Genres Picked</li>
  } else if (!Array.isArray(track.genres)) {
    return <li>{track.genres.genreName}</li>
  } else {
    return track.genres.map((genre) => (
      <li key={genre.id}>{genre.genreName}</li>
    ))
  }
}

export default TrackGenres
