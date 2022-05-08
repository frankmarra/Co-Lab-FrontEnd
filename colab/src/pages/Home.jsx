import LoginSignup from '../components/LoginSignup'
import Logout from '../components/Logout'

const Home = ({ setUser }) => {
  return (
    <div className="home-wrapper">
      <div className="home-left">
        <div className="home-image">
          <img src="https://images.pexels.com/photos/4634553/pexels-photo-4634553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          <div className="about-colab">words</div>
        </div>
      </div>
      <div className="home-center">
        <div className="home-title">Co-Lab</div>
        <div className="loginout-buttons">
          <LoginSignup setUser={setUser} />
          <Logout />
        </div>
      </div>
      <div className="home-right">
        <div className="home-playlist">
          <iframe
            src="https://open.spotify.com/embed/playlist/3dcQJuWszkPX3H28QugNRr?utm_source=generator&theme=0"
            width="100%"
            height="380"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Home
