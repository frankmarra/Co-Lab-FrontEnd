import { useEffect, useState } from 'react'
import UserAudioPlayer from './UserAudioPlayer'

const ViewCollabs = ({
  userDetails,
  allTracks,
  activeUser,
  setTrackDetails,
  authenticated
}) => {
  const [userColabs, setUserColabs] = useState([])

  useEffect(() => {
    const getUserColabs = () => {
      let tracks = []
      userDetails.collabs.forEach((colab) => {
        allTracks.forEach((track) => {
          if (track.id === colab.trackId) {
            tracks.push(track)
          }
        })
      })
      setUserColabs(tracks)
    }
    getUserColabs()
  }, [])

  return (
    <UserAudioPlayer
      tracks={userColabs}
      activeUser={activeUser}
      setTrackDetails={setTrackDetails}
      authenticated={authenticated}
    />
  )
}

export default ViewCollabs
