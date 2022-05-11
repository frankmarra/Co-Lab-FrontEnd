import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import SearchPage from './pages/SearchPage'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import axios from 'axios'

// const UserContext = createContext()

function App() {
  const [activeUser, setActiveUser] = useState(null)
  const [authenticated, toggleAuthenticated] = useState(false)
  const [genres, setGenres] = useState()
  const [metadata, setMetadata] = useState()
  const [needs, setNeeds] = useState()
  const [tracks, setTracks] = useState()
  const [tracksLength, setTracksLength] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }

    const getTracks = async () => {
      const response = await axios.get(`http://localhost:3001/api/tracks`)
      setTracks(response.data)
      setTracksLength(response.data.length)
    }
    getTracks()
  }, [])

  const handleLogOut = () => {
    setActiveUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setActiveUser(user)
    toggleAuthenticated(true)
  }
  return (
    <div className="App">
      <Nav
        authenticated={authenticated}
        activeUser={activeUser}
        handleLogOut={handleLogOut}
      />
      <Routes>
        <Route
          path="/"
          element={<Home tracks={tracks} tracksLength={tracksLength} />}
        />
        <Route
          path="/register"
          element={
            <Signup
              setActiveUser={setActiveUser}
              toggleAuthenticated={toggleAuthenticated}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Signin
              setActiveUser={setActiveUser}
              toggleAuthenticated={toggleAuthenticated}
            />
          }
        />
        <Route
          path="/users/:user_id"
          element={
            <UserProfile
              activeUser={activeUser}
              authenticated={authenticated}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchPage
              genres={genres}
              metadata={metadata}
              needs={needs}
              setGenres={setGenres}
              setMetadata={setMetadata}
              setNeeds={setNeeds}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
