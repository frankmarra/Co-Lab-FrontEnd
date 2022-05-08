import { useState, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'

const UserContext = createContext()

function App() {
  const [user, setUser] = useState({})

  // <Nav />
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home setUser={setUser} />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App
