import { Link } from 'react-router-dom'

const Nav = ({ authenticated, activeUser, handleLogOut }) => {
  let authenticatedOptions
  if (activeUser) {
    authenticatedOptions = (
      <ul className="nav-buttons">
        <li>
          <Link to={`/users/${activeUser.id}`}>{activeUser.userName}</Link>
        </li>
        <li>
          <Link to="/" className="logout-button" onClick={handleLogOut}>
            Log Out
          </Link>
        </li>
      </ul>
    )
  }

  const publicOptions = (
    <ul className="nav-buttons">
      <li>
        <Link to="/register">Sign-Up</Link>
      </li>
      <li>
        <Link to="/signin">Log-In</Link>
      </li>
    </ul>
  )
  return (
    <header>
      <nav>
        <ul className="nav-search-title">
          <li>
            <Link to="/search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </li>
          <li>
            <Link className="nav-title" to="/">
              Co-lab
            </Link>
          </li>
        </ul>
        {authenticated && activeUser ? authenticatedOptions : publicOptions}
      </nav>
    </header>
  )
}
export default Nav
