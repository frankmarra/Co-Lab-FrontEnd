import ReactPlayer from 'react-player'

const AudioPlayer = () => {
  return (
    <div className="player-wrapper">
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
