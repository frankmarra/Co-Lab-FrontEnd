import AudioPlayer from './AudioPlayer'

const UserAudioPlayer = ({
  tracks,
  activeUser,
  setTrackDetails,
  userDetails,
  authenticated
}) => {
  return (
    tracks && (
      <div className="user-tracks">
        {tracks.map((track) => (
          <AudioPlayer
            track={track}
            key={track.id}
            activeUser={activeUser}
            setTrackDetails={setTrackDetails}
            userDetails={userDetails}
            authenticated={authenticated}
          />
        ))}
      </div>
    )
  )
}

export default UserAudioPlayer
