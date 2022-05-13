import { useState, useEffect } from 'react'
import AudioPlayer from '../components/AudioPlayer'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = ({ tracks, tracksLength }) => {
  const [randomTrackNumber, setRandomTrackNumber] = useState()

  useEffect(() => {
    setRandomTrackNumber(Math.floor(Math.random() * tracksLength))
  }, [tracksLength])

  return (
    tracks && (
      <div className="home-wrapper">
        <div className="home-top-image-carousel">
          <div className="home-image">
            <img src="https://images.pexels.com/photos/4988131/pexels-photo-4988131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            <div className="about-colab">words</div>
          </div>
        </div>

        <Link className="home-search" to="/search">
          Search
        </Link>

        <div className="home-right">
          <div className="home-playlist"></div>
        </div>
      </div>
    )
  )
}

export default Home
