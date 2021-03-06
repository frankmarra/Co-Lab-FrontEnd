import ReactPlayer from 'react-player'

const AudioPlayerPreview = ({ track, genres, metadata, needs }) => {
  return track ? (
    <div className="player-wrapper">
      <div className="player-track-title">
        <h3>{track.trackName}</h3>
      </div>
      <div className="player-track-pic-description">
        <img src={track.trackArt} alt={track.trackName} />
        <p>{track.trackDescription}</p>
      </div>
      <div>
        <div className="player-track-data">
          <ul className="player-track-genres">
            <span className="label">Genres</span>
            {track.genres ? (
              !Array.isArray(track.genres) ? (
                genres.map((genre) =>
                  genre.id === track.genres.genreId ? (
                    <li key={track.genres.genreId}>{genre.genreName}</li>
                  ) : (
                    console.log('no need selected')
                  )
                )
              ) : (
                track.genres.map((trackGenre) =>
                  genres.map((genre) =>
                    genre.id === trackGenre.genreId ? (
                      <li key={genre.id}>{genre.genreName}</li>
                    ) : (
                      console.log('no need selected')
                    )
                  )
                )
              )
            ) : (
              <li>No Genres Picked</li>
            )}
          </ul>
          <ul className="player-track-metadata">
            <span className="label">Moods</span>
            {track.metadata ? (
              !Array.isArray(track.metadata) ? (
                metadata.map((data) =>
                  data.id === track.metadata.metadataId ? (
                    <li key={data.id}>{data.metadataName}</li>
                  ) : (
                    console.log('no need selected')
                  )
                )
              ) : (
                track.metadata.map((trackMetadata) =>
                  metadata.map((data) =>
                    data.id === trackMetadata.metadataId ? (
                      <li key={data.id}>{data.metadataName}</li>
                    ) : (
                      console.log('no need selected')
                    )
                  )
                )
              )
            ) : (
              <li>No Moods Picked</li>
            )}
          </ul>
          <ul className="player-track-needs">
            <span className="label">Needs</span>
            {track.needs ? (
              !Array.isArray(track.needs) ? (
                needs.map((need) =>
                  needs.id === track.needs.needId ? (
                    <li key={needs.id}>{need.needName}</li>
                  ) : (
                    console.log('no need selected')
                  )
                )
              ) : (
                track.needs.map((trackNeed) =>
                  needs.map((need) =>
                    need.id === trackNeed.needId ? (
                      <li key={needs.id}>{need.needName}</li>
                    ) : (
                      console.log('no need selected')
                    )
                  )
                )
              )
            ) : (
              <li>No Needs Picked</li>
            )}
          </ul>
        </div>
      </div>
      <div className="react-player-wrapper">
        <ReactPlayer
          url={track.trackAudio}
          className="react-player"
          controls={true}
          height="100%"
          width="100%"
          config={{
            file: {
              forceAudio: true
            }
          }}
        />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default AudioPlayerPreview
