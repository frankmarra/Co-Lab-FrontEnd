import { useState, useEffect } from 'react'
import axios from 'axios'

const UserProfile = ({ activeUser, authenticated }) => {
  return activeUser && authenticated ? (
    <div className="user-page-wrapper">
      <div className="user-page-name"></div>
    </div>
  ) : (
    <div className="protected">
      <h3>Please log in...</h3>
    </div>
  )
}

export default UserProfile
