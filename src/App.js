import { useState, useEffect } from 'react'
import { useNavigate, Route, Routes } from 'react-router-dom'
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
import UpdateUser from './pages/UpdateUser'
import CreateColab from './pages/CreateColab'
import DeleteTrack from './pages/DeleteTrack'
import axios from 'axios'

function App() {
  const [activeUser, setActiveUser] = useState({ id: 0, userName: 'guest' })
  const [authenticated, toggleAuthenticated] = useState(false)
  const [genres, setGenres] = useState()
  const [metadata, setMetadata] = useState()
  const [needs, setNeeds] = useState()
  const [userDetails, setUserDetails] = useState()
  const [userTracks, setUserTracks] = useState()
  const [allTracks, setAllTracks] = useState()
  const [trackDetails, setTrackDetails] = useState()
  const [users, setUsers] = useState([])
  const [colabs, setColabs] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
    const getUsers = async () => {
      const response = await axios.get(
        `https://co-lab-backend-production.up.railway.app/api/users`
      )
      setUsers(response.data)
    }

    const getTracks = async () => {
      const response = await axios.get(
        `https://co-lab-backend-production.up.railway.app↗/api/tracks`
      )
      setAllTracks(response.data)
    }
    const getColabs = async () => {
      const response = await axios.get(
        `https://co-lab-backend-production.up.railway.app/api/collabs`
      )
      setColabs(response.data)
    }
    const getGenres = async () => {
      const response = await axios.get(
        `https://co-lab-backend-production.up.railway.app/api/genres`
      )
      setGenres(response.data)
    }
    const getMetadata = async () => {
      const response = await axios.get(
        `https://co-lab-backend-production.up.railway.app/api/metadata`
      )
      setMetadata(response.data)
    }
    const getNeeds = async () => {
      const response = await axios.get(
        `https://co-lab-backend-production.up.railway.app/api/needs`
      )
      setNeeds(response.data)
    }

    getGenres()
    getMetadata()
    getNeeds()
    getUsers()
    getTracks()
    getColabs()
  }, [])

  const handleLogOut = () => {
    setActiveUser({ id: 0, userName: 'guest' })
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
        <Route path="/" element={<Home users={users} colabs={colabs} />} />
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
              allTracks={allTracks}
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
              userDetails={userDetails}
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
              setTrackDetails={setTrackDetails}
              userDetails={userDetails}
            />
          }
        />
        <Route
          path="/users/:userId/createcolab"
          element={
            <CreateColab
              activeUser={activeUser}
              authenticated={authenticated}
              userDetails={userDetails}
            />
          }
        />
        <Route
          path="/users/:userId/deletetrack"
          element={
            <DeleteTrack
              userDetails={userDetails}
              activeUser={activeUser}
              authenticated={authenticated}
              genres={genres}
              metadata={metadata}
              needs={needs}
            />
          }
        />
        <Route
          path="/users/:userId/update"
          element={
            <UpdateUser
              activeUser={activeUser}
              authenticated={authenticated}
              userDetails={userDetails}
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
              setTrackDetails={setTrackDetails}
              activeUser={activeUser}
              authenticated={authenticated}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
