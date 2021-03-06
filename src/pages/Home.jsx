import { Link } from 'react-router-dom'
import RandomUserCard from '../components/RandomUserCard'

const Home = ({ users, colabs }) => {
  return (
    <div className="home-wrapper">
      <div className="home-top-image-carousel">
        <div className="home-image">
          <img src="https://res.cloudinary.com/silverbeard/image/upload/v1652576895/colab_banner_new_n2giih.png" />
          <div className="about-colab">
            <h2 className="about-colab-info">
              Upload Tracks. Explore New Music. Co-laborate.{' '}
            </h2>
            <Link to={'/register'}>
              <h2 className="about-colab-words">Get Started</h2>
            </Link>
          </div>
        </div>
      </div>
      <div className="home-search-div">
        <div className="heading-alt-font">
          {colabs.length} Colabs{' '}
          <span className="heading-font">and counting!</span>
        </div>
        <Link className="home-search" to="/search">
          Explore{' '}
          <span>
            <i class="fa-solid fa-angles-right"></i>
          </span>
        </Link>
      </div>

      {users ? (
        <div className="random-users">
          <RandomUserCard
            randomUser={users[Math.floor(Math.random() * users.length)]}
          />
          <RandomUserCard
            randomUser={users[Math.floor(Math.random() * users.length)]}
          />
          <RandomUserCard
            randomUser={users[Math.floor(Math.random() * users.length)]}
          />
          <RandomUserCard
            randomUser={users[Math.floor(Math.random() * users.length)]}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Home
