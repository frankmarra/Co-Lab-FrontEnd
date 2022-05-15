import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RandomUserCard from '../components/RandomUserCard'

const Home = ({ users }) => {
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
      <Link className="home-search" to="/search">
        <div className="home-search-div">Explore</div>
      </Link>
      <h4>Or check out a random user</h4>
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
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Home
