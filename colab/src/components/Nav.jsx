import { Link } from 'react-router-dom'

const Nav = ({ authenticated, activeUser, handleLogOut }) => {
  let authenticatedOptions
  if (activeUser) {
    authenticatedOptions = (
      <nav>
        <Link to="/search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </Link>
        <div className="nav-title">
          <Link to="/">Co-lab</Link>
        </div>
        <div className="user-buttons">
          <Link className="user-home-link" to={`/users/${activeUser.id}`}>
            {activeUser.userName}
          </Link>
          <Link to="/" className="logout-button" onClick={handleLogOut}>
            Log Out
          </Link>
        </div>
      </nav>
    )
  }

  const publicOptions = (
    <nav>
      <Link to="/search">
        <i className="fa-solid fa-magnifying-glass"></i>
      </Link>
      <div className="nav-title">
        <Link to="/">Co-lab</Link>
      </div>
      <div className="signin-signup-buttons">
        <div className="signup-button">
          <Link to="/register">Sign-Up</Link>
        </div>
        <div className="signin-button">
          <Link to="/signin">Log-In</Link>
        </div>
      </div>
    </nav>
  )
  return (
    <header>
      {authenticated && activeUser ? authenticatedOptions : publicOptions}
    </header>
  )
}
export default Nav
