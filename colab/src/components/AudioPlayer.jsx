import ReactPlayer from 'react-player/lazy'
import WaveSurfer from 'wavesurfer.js'

const AudioPlayer = ({ track }) => {
  // let wavesurfer = WaveSurfer.create({
  //   container: '#waveform',
  //   waveColor: 'violet',
  //   progressColor: 'purple'
  // })
  // wavesurfer.load(
  //   'https://res.cloudinary.com/silverbeard/video/upload/v1652029890/40_YEAR_OLD_TEENAGERV2_fzudnz.mp3',
  //   'https://docs.google.com/uc?export=open&id=0B2Dfs3ziFiE7cWNFV3Y2ODhHT0tSc0daUmc3UmhBemp0Z0xn',
  //   'https://docs.google.com/uc?export=open&id=0B2Dfs3ziFiE7dE41ZXNCeHhkNWQwZ1hzTjVLbDBXVHRWYUZJ'
  // )
  // <div id="waveform"></div>
  return track ? (
    <div className="player-wrapper">
      <div className="player-track-title">
        <h3>{track.trackName}</h3>
      </div>

      <ReactPlayer
        url={track.trackAudio}
        controls={true}
        height="50px"
        config={{
          file: {
            forceAudio: true
          }
        }}
      />
    </div>
  ) : (
    <div></div>
  )
}

export default AudioPlayer
