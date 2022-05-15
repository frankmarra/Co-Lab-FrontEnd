import ReactPlayer from 'react-player'

const RandomUserCard = ({ randomUser }) => {
  return (
    randomUser && (
      <div className="random-user-wrapper">
        <div className="random-user-banner">
          <img src="" alt={randomUser.userName} />
          <div className="random-user-pic-and-name">
            <img src={randomUser.userPic} alt={randomUser.userName} />
            {randomUser.userName}
          </div>
          <div className="random-user-song-name">
            {randomUser.Tracks[0].trackName}
          </div>
        </div>
        <div className="react-player-wrapper">
          <ReactPlayer
            url={randomUser.Tracks[0].trackAudio}
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
    )
  )
}

export default RandomUserCard
