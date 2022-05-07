import { useState, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'

const UserContext = createContext()

function App() {
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Nav />

        <Routes>
          <Route path="/" element={<Home setUser={setUser} />} />
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App
