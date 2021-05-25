import Identity from '@arc-publishing/sdk-identity'
import * as React from 'react'

import { useSdksContext } from '../../../contexts/subscriptions-sdks'

const SubsDemo = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [rememberMe, setRememberMe] = React.useState(false)
  const [user, setUser] = React.useState('Anonimo')

  // const sdk = useSdksContext()

  // React.useEffect(() => {
  //   Identity.isLoggedIn().then((isLog) => {
  //     if (isLog) {
  //       console.log(Identity.userProfile || 'no profile')
  //       console.log(Identity.userIdentity || 'no identity')
  //       Identity.getUserProfile().then((profile) => {
  //         console.log({ profile })
  //       })
  //     } else {
  //       Identity.login('equipoeps@gmail.com', '123456789', {
  //         rememberMe: true,
  //       }).then((res) => console.log('logged now', res))
  //     }
  //   })
  // }, [])

  const handleUsername = () => {
    const { userProfile } = Identity
    if (userProfile) {
      console.log('saved profile', { userProfile })
      setUser(
        `${userProfile?.firstName} ${userProfile?.lastName} ${userProfile?.secondLastName}`
      )
    } else {
      Identity.getUserProfile().then((profile) => {
        console.log('new profile', { profile })
        setUser(
          `${profile?.firstName} ${profile?.lastName} ${profile?.secondLastName}`
        )
      })
    }
  }

  React.useEffect(() => {
    Identity.isLoggedIn().then((isLog) => (isLog ? handleUsername() : null))
    Identity.getConfig().then((conf) => {
      console.log({ conf })
    })
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    return Identity.login(username, password, {
      rememberMe,
    })
      .then((log1) => {
        console.log(log1)
        handleUsername()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <main>
      <section>
        <h1>Login</h1>
        <h2>{user}</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setRememberMe(!rememberMe)
            }}>
            remember me: {rememberMe ? 'YES' : 'NO'}
          </button>
          <button type="submit" className="button is-link">
            Login
          </button>
        </form>
      </section>
    </main>
  )
}

export default SubsDemo
