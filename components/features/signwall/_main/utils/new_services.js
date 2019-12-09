import Domains from './domains'

/* eslint-disable class-methods-use-this */
class Services {
  checkStudents(email, date, grade, site, jwt) {
    const response = new Promise(resolve => {
      fetch(`${Domains.getUrlStudents()}/validate_user_academic/`, {
        method: 'POST',
        body: JSON.stringify({
          correo: email,
          date_birth: date,
          degree: grade,
        }),
        headers: {
          'Content-Type': 'application/json',
          site,
          'user-token': jwt,
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }

  checkCodeStudents(hash, email, site, jwt) {
    const response = new Promise(resolve => {
      fetch(`${Domains.getUrlStudents()}/activate_promotion/`, {
        method: 'POST',
        body: JSON.stringify({
          hash_user: hash,
          email,
        }),
        headers: {
          'Content-Type': 'application/json',
          site,
          'user-token': jwt,
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }

  // eslint-disable-next-line class-methods-use-this
  loginFBeco(URL, username, accessToken, type) {
    const response = new Promise(resolve => {
      fetch(`${URL}/identity/public/v1/auth/token`, {
        method: 'POST',
        body: JSON.stringify({
          userName: username,
          credentials: accessToken,
          grantType: type,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }

  sendNewsLettersUser(uuid, email, site, token, data) {
    const response = new Promise(resolve => {
      fetch(
        `${Domains.getUrlNewsLetters()}/newsletter/events?v=${new Date().getTime()}`,
        {
          method: 'POST',
          cache: 'no-cache',
          body: JSON.stringify({
            type: 'newsletter',
            eventName: 'build_preference',
            uuid,
            email,
            attributes: {
              preferences: data,
              first_name: '',
              last_name: '',
            },
            brand: site,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token} ${site}`,
          },
        }
      ).then(res => resolve(res.json()))
    })
    return response
  }
}

export default new Services()
