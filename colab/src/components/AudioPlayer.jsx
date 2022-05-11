import ReactPlayer from 'react-player'
import WaveSurfer from 'wavesurfer.js'

const AudioPlayer = () => {
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
  return (
    <div className="player-wrapper">
      <div id="waveform"></div>
      <ReactPlayer
        url={[
          'https://res.cloudinary.com/silverbeard/video/upload/v1652029890/40_YEAR_OLD_TEENAGERV2_fzudnz.mp3',
          'https://docs.google.com/uc?export=open&id=0B2Dfs3ziFiE7cWNFV3Y2ODhHT0tSc0daUmc3UmhBemp0Z0xn',
          'https://docs.google.com/uc?export=open&id=0B2Dfs3ziFiE7dE41ZXNCeHhkNWQwZ1hzTjVLbDBXVHRWYUZJ'
        ]}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default AudioPlayer
