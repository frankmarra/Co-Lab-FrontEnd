import { Link } from 'react-router-dom'

const Nav = ({ authenticated, activeUser, handleLogOut }) => {
  let authenticatedOptions
  if (activeUser) {
    authenticatedOptions = (
      <ul className="nav-search-title">
        <Link to="/search">
          <li>
            <i className="fa-solid fa-magnifying-glass"></i>
          </li>
        </Link>
        <Link className="nav-title" to="/">
          <li>Co-lab</li>
        </Link>
        <div className="nav-buttons">
          <Link to={`/users/${activeUser.id}`}>
            <li>{activeUser.userName}</li>
          </Link>
          <Link to="/" className="logout-button" onClick={handleLogOut}>
            <li>Log Out</li>
          </Link>
        </div>
      </ul>
    )
  }

  const publicOptions = (
    <ul className="nav-search-title">
      <Link to="/search">
        <li>
          <i className="fa-solid fa-magnifying-glass"></i>
        </li>
      </Link>
      <Link className="nav-title" to="/">
        <li>Co-lab</li>
      </Link>
      <div className="nav-buttons">
        <Link to="/register">
          <li>Sign-Up</li>
        </Link>
        <Link to="/signin">
          <li>Log-In</li>
        </Link>
      </div>
    </ul>
  )
  return (
    <header>
      <nav>
        {authenticated && activeUser ? authenticatedOptions : publicOptions}
      </nav>
    </header>
  )
}
export default Nav
