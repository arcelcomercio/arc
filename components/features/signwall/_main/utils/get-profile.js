const skipValues = ['null', 'undefined']
const fieldsWhite = [
  'firstName',
  'lastName',
  'secondLastName',
  'displayName',
  'email',
  'attributes',
  'identities',
  'contacts',
]

class GetProfile {
  constructor() {
    const localProfile = window.localStorage.getItem('ArcId.USER_PROFILE')
    this.profile = JSON.parse(localProfile)
    this.publicProfile = this._getComplete()
    this.username = this._getUserName().nameUser
    this.initname = this._getUserName().inituser
  }

  _getComplete = () => {
    return this.cleanProfile(this.profile)
  }

  cleanAttribute = attrValue => {
    const newAttrValue =
      typeof attrValue === 'string' ? attrValue.toLowerCase() : attrValue
    return skipValues.includes(newAttrValue) ? null : attrValue
  }

  cleanProfile = (profile = {}) => {
    if (profile === null) return false

    return Object.keys(profile).reduce((prev, attr) => {
      const newPrev = prev
      if (fieldsWhite.includes(attr)) {
        switch (attr) {
          case 'attributes':
            newPrev[attr] = (profile[attr] || []).map(item => {
              const { value } = item
              item.value = this.cleanAttribute(value)
              return item
            })
            break
          case 'contacts':
            newPrev[attr] = profile[attr] === null ? [] : profile[attr]
            break
          default:
            newPrev[attr] = this.cleanAttribute(profile[attr])
            break
        }
      }
      return prev
    }, {})
  }

  _getUserName = () => {
    const profileLS = this.profile
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
    return {
      inituser,
      nameUser,
    }
  }
}

export default GetProfile
