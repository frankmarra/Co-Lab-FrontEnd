import AudioPlayer from './AudioPlayer'

const UserAudioPlayer = ({
  tracks,
  activeUser,
  setTrackDetails,
  destroyTrack
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
            destroyTrack={destroyTrack}
          />
        ))}
      </div>
    )
  )
}

export default UserAudioPlayer
