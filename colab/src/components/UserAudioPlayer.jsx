import AudioPlayer from './AudioPlayer'

const UserAudioPlayer = ({
  tracks,
  activeUser,
  setTrackDetails,
  destroyTrack
}) => {
  // let trackArray = []
  // console.log(tracks)
  // if (!Array.isArray(tracks)) {
  //   trackArray.push(tracks)
  // } else {
  //   tracks.forEach((track) => {
  //     trackArray.push(track)
  //   })
  // }
  // console.log('track array: ', track)
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
