import { Link } from 'react-router-dom'

const Nav = ({ authenticated, activeUser, handleLogOut }) => {
  let authenticatedOptions
  if (activeUser) {
    authenticatedOptions = (
      <nav>
        <Link to="/" className="nav-title">
          Co-lab
        </Link>
        <Link to={`/users/${activeUser.id}`}>{activeUser.userName}</Link>
        <Link to="/" className="logout-button" onClick={handleLogOut}>
          Log Out
        </Link>
      </nav>
    )
  }

  const publicOptions = (
    <nav>
      <Link to="/" className="nav-title">
        Co-lab
      </Link>
      <Link to="/register">Sign Up</Link>
      <Link to="/signin">Log In</Link>
    </nav>
  )
  return (
    <header>
      {authenticated && activeUser ? authenticatedOptions : publicOptions}
    </header>
  )
}
export default Nav
