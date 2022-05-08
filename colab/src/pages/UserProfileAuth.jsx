import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'

const UserProfileAuth = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0()
  const [userMetadata, setUserMetadata] = useState(null)

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'https://colab/api'

      try {
        const accessToken = await getAccessTokenSilently({
          audience: domain,
          scope: 'read:current_user'
        })

        const userDetailsByIdUrl = `${domain}/users/${user.sub}`

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        const { user_metadata } = await metadataResponse.json()

        setUserMetadata(user_metadata)
      } catch (e) {
        console.log(e.message)
      }
    }

    getUserMetadata()
  }, [getAccessTokenSilently, user?.sub])

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          'No user matadata defined'
        )}
      </div>
    )
  )
}

export default UserProfileAuth
