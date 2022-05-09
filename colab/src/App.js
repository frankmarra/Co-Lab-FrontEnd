import { useState, createContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Nav from './components/Nav'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import SearchPage from './pages/SearchPage'
import axios from 'axios'

const UserContext = createContext()

function App() {
  const [user, setUser] = useState({})
  const [genres, setGenres] = useState()
  const [metadata, setMetadata] = useState()
  const [needs, setNeeds] = useState()

  // useEffect(() => {
  //   const getGenres = async () => {
  //     const response = await axios.get(`http://localhost:8000/genres`)
  //     setGenres(response.data)
  //   }
  //   const getMetadata = async () => {
  //     const response = await axios.get(`http://localhost:8000/metadata`)
  //     setMetadata(response.data)
  //   }
  //   const getNeeds = async () => {
  //     const response = await axios.get(`http://localhost:8000/needs`)
  //     setNeeds(response.data)
  //   }

  //   getGenres()
  //   getMetadata()
  //   getNeeds()
  // }, [])
  // <Nav />
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home setUser={setUser} />} />
          <Route path="/user/" element={<UserProfile />} />
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
    </UserContext.Provider>
  )
}

export default App
