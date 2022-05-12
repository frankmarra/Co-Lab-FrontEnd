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
import AddTrack from './pages/AddTrack'
import UpdateTrack from './pages/UpdateTrack'
import CreateColab from './pages/CreateColab'
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
  const [userDetails, setUserDetails] = useState()
  const [userTracks, setUserTracks] = useState()
  const [trackDetails, setTrackDetails] = useState()

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

    const getGenres = async () => {
      const response = await axios.get(`http://localhost:3001/api/genres`)
      setGenres(response.data)
    }
    const getMetadata = async () => {
      const response = await axios.get(`http://localhost:3001/api/metadata`)
      setMetadata(response.data)
    }
    const getNeeds = async () => {
      const response = await axios.get(`http://localhost:3001/api/needs`)
      setNeeds(response.data)
    }

    getGenres()
    getMetadata()
    getNeeds()
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
          path="/users/:userId"
          element={
            <UserProfile
              activeUser={activeUser}
              authenticated={authenticated}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
              userTracks={userTracks}
              setUserTracks={setUserTracks}
              setTrackDetails={setTrackDetails}
            />
          }
        />
        <Route
          path="/users/:userId/addtrack"
          element={
            <AddTrack
              activeUser={activeUser}
              authenticated={authenticated}
              genres={genres}
              metadata={metadata}
              needs={needs}
            />
          }
        />
        <Route
          path="/users/:userId/updatetrack/:trackId"
          element={
            <UpdateTrack
              activeUser={activeUser}
              authenticated={authenticated}
              genres={genres}
              metadata={metadata}
              needs={needs}
              trackDetails={trackDetails}
            />
          }
        />
        <Route
          path="/users/:userId/createcolab"
          element={
            <CreateColab
              activeUser={activeUser}
              authenticated={authenticated}
              userTracks={userTracks}
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
