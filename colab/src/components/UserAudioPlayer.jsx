import AudioPlayer from './AudioPlayer'

const UserAudioPlayer = ({ tracks }) => {
  return (
    tracks && (
      <div className="user-tracks">
        {tracks.map((track) => (
          <AudioPlayer track={track} />
        ))}
      </div>
    )
  )
}

export default UserAudioPlayer
