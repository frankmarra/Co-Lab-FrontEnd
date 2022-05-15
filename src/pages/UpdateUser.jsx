import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateUser = ({ activeUser, authenticated, userDetails }) => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    userName: '',
    userPic: '',
    userBannerPic: '',
    userAbout: '',
    userSpotPlay: '',
    userId: activeUser.id
  })

  useEffect(() => {
    setFormValues({
      ...formValues,
      userName: userDetails.userName,
      userPic: userDetails.userPic,
      userBannerPic: userDetails.userBannerPic,
      userAbout: userDetails.userAbout,
      userSpotPlay: userDetails.userSpotPlay
    })
  }, [])

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(
      `https://colabdb.herokuapp.com/api/users/${activeUser.id}`,
      formValues
    )
    navigate(`/users/${activeUser.id}`)
  }

  return userDetails && authenticated ? (
    <div className="update-user-wrapper">
      <div className="update-user-form-wrapper">
        <div className="heading-font">update</div>
        <div className="heading-alt-font">{activeUser.userName}</div>
        <form
          className="update-user-form"
          id="update-user"
          onSubmit={handleSubmit}
        >
          <div className="input-wrapper">
            <label htmlFor="userName">User Name:</label>
            <input
              onChange={handleChange}
              name="userName"
              type="text"
              value={formValues.userName}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="userPic">User Picture Link:</label>
            <input
              onChange={handleChange}
              name="userPic"
              type="text"
              value={formValues.userPic}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="userBannerPic">User Banner Picture Link:</label>
            <input
              onChange={handleChange}
              name="userBannerPic"
              type="text"
              value={formValues.userBannerPic}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="userSpotPlay">User Spotify Playlist:</label>
            <input
              onChange={handleChange}
              name="userSpotPlay"
              type="text"
              value={formValues.userSpotPlay}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="userAbout">User About:</label>
            <textarea
              onChange={handleChange}
              name="userAbout"
              value={formValues.userAbout}
              form="update-user"
              rows="4"
              cols="50"
            >
              This will be displayed on your profile to other users. Let them
              know a little about ya'self.
            </textarea>
          </div>
          <div className="form-buttons">
            <button type="Submit">Submit</button>
            <button onClick={() => navigate(`/users/${activeUser.id}`)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default UpdateUser
