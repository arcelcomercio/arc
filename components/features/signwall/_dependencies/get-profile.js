import {
  SITE_ELCOMERCIO,
  SITE_GESTION,
} from '../../../utilities/constants/sitenames'

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
  'birthYear',
  'birthMonth',
  'birthDay',
  'gender',
]

class GetProfile {
  constructor(arcSite = '') {
    this.profile = null
    this.arcSite = arcSite
    if (typeof window !== 'undefined') {
      const localProfile = window.localStorage.getItem('ArcId.USER_PROFILE')

      this.profile = JSON.parse(localProfile || '{}') || {}
    }
    this.publicProfile = this._getComplete()
    this.username = this._getUserName().userName
    this.initname = this._getUserName().inituser
  }

  _getComplete = () => this.cleanProfile(this.profile || {})

  cleanAttribute = (attrValue) => {
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
            newPrev[attr] = (profile[attr] || []).map((item) => {
              const { value, name } = item
              // eslint-disable-next-line no-param-reassign
              item.value =
                name !== 'dataTreatment' ? this.cleanAttribute(value) : value
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
    const { profile } = this
    const exclusiveSites =
      this.arcSite === SITE_ELCOMERCIO || this.arcSite === SITE_GESTION
    let userName = exclusiveSites ? 'Bienvenido Usuario' : 'Mi Perfil'
    let inituser = false

    if (
      profile !== null &&
      (profile.firstName !== null || profile.lastName !== null)
    ) {
      switch (true) {
        case (profile.firstName !== 'undefined' ||
          profile.firstName !== null) &&
          (profile.lastName === 'undefined' || profile.lastName === null):
          if (profile.firstName === 'undefined' || profile.firstName === null) {
            userName = exclusiveSites ? 'Bienvenido Usuario' : 'Mi Perfil'
          } else {
            userName =
              profile && profile.firstName.length >= 15
                ? `${profile.firstName.slice(0, 15)}...`
                : profile.firstName
            inituser = profile && profile.firstName.slice(0, 2)
          }
          break
        case (profile.firstName !== 'undefined' ||
          profile.firstName !== null) &&
          (profile.lastName !== 'undefined' || profile.lastName !== null):
          if (profile.firstName === 'undefined' || profile.firstName === null) {
            userName =
              profile.lastName.length >= 15
                ? `${profile.lastName.slice(0, 15)}...`
                : profile.lastName
            inituser = profile && profile.lastName.slice(0, 2)
          } else {
            userName =
              `${profile.firstName} ${profile.lastName}`.length >= 15
                ? `${`${profile.firstName} ${profile.lastName}`.slice(
                    0,
                    15
                  )}...`
                : `${profile.firstName} ${profile.lastName}`
            inituser =
              profile &&
              profile.firstName.slice(0, 1) + profile.lastName.slice(0, 1)
          }
          break
        default:
          return null
      }
    }
    return {
      inituser,
      userName,
    }
  }
}

export default GetProfile
