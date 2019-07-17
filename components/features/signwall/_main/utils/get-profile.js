/* eslint-disable class-methods-use-this */

const skipValues = ['null', 'undefined'];
const fieldsWhite = [
  'firstName',
  'lastName',
  'secondLastName',
  'displayName',
  'email',
  'attributes',
  'identities',
  'contacts',
];

class GetProfile {
  constructor() {
    const localProfile = window.localStorage.getItem('ArcId.USER_PROFILE')
    this.profile = JSON.parse(localProfile);
    this.publicProfile = this._getComplete();
    this.username = this._getUserName().nameUser
    this.initname = this._getUserName().inituser
  }

  _getComplete = () => {
    return this.cleanProfile(this.profile);
  };

  cleanAttribute(attrValue) {
    attrValue =
      typeof attrValue === 'string' ? attrValue.toLowerCase() : attrValue;

    return skipValues.includes(attrValue) ? null : attrValue;
  }
 
  cleanProfile(profile = {}, mapFn) {
    if (profile === null) return;

    // eslint-disable-next-line consistent-return
    return Object.keys(profile).reduce((prev, attr) => {
      if (fieldsWhite.includes(attr)) {
        switch (attr) {
          case 'attributes':
            prev[attr] = (profile[attr] || []).map(item => {
              const { value } = item;
              item.value = this.cleanAttribute(value);
              return item;
            });
            break;
          case 'contacts':
            prev[attr] = profile[attr] === null ? [] : profile[attr];
            break;
          default:
            prev[attr] = this.cleanAttribute(profile[attr]);
            break;
        }
      }
      return prev;
    }, {});
  }

  _getUserName = () => {
    const profileLS = this.profile;
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
              profileLS.firstName.length >= 15 ?
              `${profileLS.firstName.slice(0, 15)}...` :
              profileLS.firstName
            inituser = profileLS.firstName.slice(0, 2)
          }
          break
        case (profileLS.firstName !== 'undefined' ||
          profileLS.firstName != null) &&
        (profileLS.lastName !== 'undefined' || profileLS.lastName != null):
          if (profileLS.firstName === 'undefined') {
            nameUser =
              profileLS.lastName.length >= 15 ?
              `${profileLS.lastName.slice(0, 15)}...` :
              profileLS.lastName
            inituser = profileLS.lastName.slice(0, 2)
          } else {
            nameUser =
              `${profileLS.firstName} ${profileLS.lastName}`.length >= 15 ?
              `${`${profileLS.firstName} ${profileLS.lastName}`.slice(
                    0,
                    15
                  )}...` :
              `${profileLS.firstName} ${profileLS.lastName}`
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
      nameUser
    }
  }
}

export default GetProfile