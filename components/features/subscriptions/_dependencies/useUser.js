const getUserName = (firstName, lastName) => {
  let fullName = 'Bienvenido Usuario'
  const badName = /undefined|null/
  if (
    firstName &&
    !firstName.match(badName) &&
    lastName &&
    !lastName.match(badName)
  ) {
    fullName = `${firstName} ${lastName}`
  }
  if (
    firstName &&
    !firstName.match(badName) &&
    (!lastName || lastName.match(badName))
  ) {
    fullName = firstName
  }
  if (
    lastName &&
    !lastName.match(badName) &&
    (!firstName || firstName.match(badName))
  ) {
    fullName = lastName
  }
  return fullName.length <= 20 ? fullName : `${fullName.slice(0, 20)}...`
}

const isLogged = () => {
  if (typeof window !== 'undefined') {
    return (
      window.localStorage.getItem('ArcId.USER_INFO') &&
      window.localStorage.getItem('ArcId.USER_INFO') !== '{}'
    )
  }
  return null
}

export { getUserName, isLogged }
