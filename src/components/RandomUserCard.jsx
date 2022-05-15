import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'

const RandomUserCard = ({ randomUser }) => {
  return (
    randomUser && (
      <div className="random-user-wrapper">
        <Link to={`/users/${randomUser.id}`}>
          <div className="random-user-banner">
            <img src={randomUser.userBannerPic} alt={randomUser.userName} />
            <div className="random-user-pic-and-name">
              <img src={randomUser.userPic} alt={randomUser.userName} />
              <div className="random-user-name">
                {randomUser.userName}
                {randomUser.Tracks.length > 0 ? (
                  <div className="random-user-track-name">
                    {randomUser.Tracks[0].trackName}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </Link>
        {randomUser.Tracks.length > 0 ? (
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
        ) : (
          <div>{randomUser.userName} has no tracks yet</div>
        )}
      </div>
    )
  )
}

export default RandomUserCard
