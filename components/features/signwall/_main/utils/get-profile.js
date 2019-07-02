class GetProfile {
  constructor() {
    const localProfile = window.localStorage.getItem('ArcId.USER_PROFILE')
    this.profileJson = JSON.parse(localProfile)
    this.profile = this._getComplete()
    this.username = this._getUserName().nameUser
    this.initname = this._getUserName().inituser
  }

  _getComplete = () => {
    return this.objectMap(this.profileJson, value => {
      if (value !== null) {
        return value
      }
      return null
    })
  }

  objectMap = (object, mapFn) => {
    if (object != null) {
      return Object.keys(object).reduce((result, key) => {
        const auxResult = result
        if (
          key === 'firstName' ||
          key === 'lastName' ||
          key === 'secondLastName' ||
          key === 'displayName' ||
          key === 'email' ||
          key === 'attributes'
        ) {
          auxResult[key] = mapFn(object[key])
        }
        return auxResult
      }, {})
    }
    return null
  }

  _getUserName = () => {
    const profileLS = this.profileJson
    let nameUser = 'Bienvenido Usuario'
    let inituser = false

    if (
      profileLS != null &&
      (profileLS.firstName != null || profileLS.lastName != null)
    ) {
      switch (true) {
        case (profileLS.firstName !== 'undefined' ||
          profileLS.firstName != null) &&
          (profileLS.lastName === 'undefined' || profileLS.lastName == null):
          if (profileLS.firstName === 'undefined') {
            nameUser = 'Bienvenido Usuario'
            inituser = false
          } else {
            nameUser =
              profileLS.firstName.length >= 15
                ? `${profileLS.firstName.slice(0, 15)}...`
                : profileLS.firstName
            inituser = profileLS.firstName.slice(0, 2)
          }
          break
        case (profileLS.firstName !== 'undefined' ||
          profileLS.firstName != null) &&
          (profileLS.lastName !== 'undefined' || profileLS.lastName != null):
          if (profileLS.firstName === 'undefined') {
            nameUser =
              profileLS.lastName.length >= 15
                ? `${profileLS.lastName.slice(0, 15)}...`
                : profileLS.lastName
            inituser = profileLS.lastName.slice(0, 2)
          } else {
            nameUser =
              `${profileLS.firstName} ${profileLS.lastName}`.length >= 15
                ? `${`${profileLS.firstName} ${profileLS.lastName}`.slice(
                    0,
                    15
                  )}...`
                : `${profileLS.firstName} ${profileLS.lastName}`
            inituser =
              profileLS.firstName.slice(0, 1) + profileLS.lastName.slice(0, 1)
          }
          break
        default:
          return null
      }
    }
    return { inituser, nameUser }
  }
}

export default GetProfile
