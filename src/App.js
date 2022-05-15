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
import UpdateUser from './pages/UpdateUser'
import CreateColab from './pages/CreateColab'
import DeleteTrack from './pages/DeleteTrack'
import axios from 'axios'

// const UserContext = createContext()

function App() {
  const [activeUser, setActiveUser] = useState({ id: 0, userName: 'guest' })
  const [authenticated, toggleAuthenticated] = useState(false)
  const [genres, setGenres] = useState()
  const [metadata, setMetadata] = useState()
  const [needs, setNeeds] = useState()
  const [userDetails, setUserDetails] = useState()
  const [userTracks, setUserTracks] = useState()
  const [trackDetails, setTrackDetails] = useState()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
    const getUsers = async () => {
      const response = await axios.get(
        `https://colabdb.herokuapp.com/api/users`
      )
      setUsers(response.data)
    }
    const getGenres = async () => {
      const response = await axios.get(
        `https://colabdb.herokuapp.com/api/genres`
      )
      setGenres(response.data)
    }
    const getMetadata = async () => {
      const response = await axios.get(
        `https://colabdb.herokuapp.com/api/metadata`
      )
      setMetadata(response.data)
    }
    const getNeeds = async () => {
      const response = await axios.get(
        `https://colabdb.herokuapp.com/api/needs`
      )
      setNeeds(response.data)
    }

    getGenres()
    getMetadata()
    getNeeds()
    getUsers()
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

  const destroyTrack = async (trackId) => {
    await axios.delete(`https://colabdb.herokuapp.com/api/tracks/${trackId}`)
  }

  return (
    <div className="App">
      <Nav
        authenticated={authenticated}
        activeUser={activeUser}
        handleLogOut={handleLogOut}
      />
      <Routes>
        <Route path="/" element={<Home users={users} />} />
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
              userTracks={userTracks}
            />
          }
        />
        <Route
          path="/users/:userId/deletetrack"
          element={
            <DeleteTrack
              userTracks={userTracks}
              activeUser={activeUser}
              authenticated={authenticated}
              destroyTrack={destroyTrack}
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
