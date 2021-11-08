import Identity from '@arc-publishing/sdk-identity'
import sha256 from 'crypto-js/sha256'
import getProperties from 'fusion:properties'
import * as React from 'react'

import { setCookie } from '../../../../utilities/client/cookies'
import { getQuery } from '../../../../utilities/parse/queries'
import getDevice from '../../../subscriptions/_dependencies/GetDevice'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import { isFbBrowser } from '../../../subscriptions/_dependencies/Utils'
import { getOriginAPI, getUrlECOID } from '../../_dependencies/domains'
import { loginFBeco, sendNewsLettersUser } from '../../_dependencies/services'
import { Facebook, Google, Mail } from '../icons'

const originAction = (dialogModal) => {
  switch (dialogModal) {
    case 'organico' || 'banner':
      return '0'
    case 'hard':
      return '1'
    case 'relogemail':
      return 'reloginemail'
    case 'reloghash':
      return 'reloginhash'
    default:
      return dialogModal
  }
}

const AfterLoginRegister = (
  emailUser,
  typeDialog,
  typeForm,
  provider,
  siteDomain,
  onLogged,
  resProfile,
  checkUserSubs,
  onStudents,
  onClose,
  arcSite
) => {
  Taggeo(
    `Web_Sign_Wall_${typeDialog}`,
    `web_sw${typeDialog[0]}_${typeForm}_success_${provider}`,
    arcSite
  )
  setCookie('arc_e_id', sha256(emailUser).toString(), 365)
  const USER_IDENTITY = JSON.stringify(Identity.userIdentity || {})
  setCookie('ArcId.USER_INFO', USER_IDENTITY, 1, siteDomain)

  onLogged(resProfile)

  const btnSignwall = document.getElementById('signwall-nav-btn')

  switch (typeDialog) {
    case 'students':
      onStudents()
      break
    case 'premium':
    case 'paywall':
      checkUserSubs()
      break
    case 'newsletter':
      if (btnSignwall) {
        btnSignwall.textContent = `${resProfile.firstName || 'Bienvenido'}  ${
          resProfile.lastName || ''
        }`
      }
      onClose()
      break
    default:
      onClose()
  }
}

const setupUserProfile = (
  resAccessToken,
  provider,
  arcSite,
  onClose,
  activeNewsletter,
  typeDialog,
  typeForm,
  onLogged,
  checkUserSubs,
  onStudents,
  dataTreatment
) => {
  const { siteDomain } = getProperties(arcSite) || {}

  Identity.getUserProfile()
    .then((resProfile) => {
      const EMAIL_USER =
        resProfile.email ||
        `${resProfile.identities[0].userName}@${provider}.com`

      if (!resProfile.attributes) {
        const newProfileFB = {
          firstName: resProfile.firstName.replace(/\./g, ''),
          lastName: resProfile.lastName.replace(/\./g, ''),
          displayName: EMAIL_USER,
          email: EMAIL_USER,
          attributes: [
            {
              name: 'originDomain',
              value: window.location.hostname || 'none',
              type: 'String',
            },
            {
              name: 'originReferer',
              value:
                window.location.href
                  .split('&')[0]
                  .replace(/(\/|=|#|\/#|#\/|=\/|\/=)$/, '') || 'none',
              type: 'String',
            },
            {
              name: 'originMethod',
              value: provider === 'facebook' ? '2' : '5',
              type: 'String',
            },
            {
              name: 'originDevice',
              value: getDevice(window) || 'none',
              type: 'String',
            },
            {
              name: 'originAction',
              value: originAction(typeDialog) || 'none',
              type: 'String',
            },
            {
              name: 'termsCondPrivaPoli',
              value: '1',
              type: 'String',
            },
            {
              name: 'dataTreatment',
              value: dataTreatment,
              type: 'String',
            },
          ],
        }

        Identity.updateUserProfile(newProfileFB)
          .then(() => {
            if (activeNewsletter && EMAIL_USER.indexOf('facebook.com') < 0) {
              sendNewsLettersUser(
                resProfile.uuid,
                EMAIL_USER,
                arcSite,
                resAccessToken,
                ['general']
              )
                .then(() => {
                  AfterLoginRegister(
                    EMAIL_USER,
                    typeDialog,
                    typeForm,
                    provider,
                    siteDomain,
                    onLogged,
                    resProfile,
                    checkUserSubs,
                    onStudents,
                    onClose,
                    arcSite
                  )
                })
                .catch(() => {
                  onClose()
                })
            } else {
              AfterLoginRegister(
                EMAIL_USER,
                typeDialog,
                typeForm,
                provider,
                siteDomain,
                onLogged,
                resProfile,
                checkUserSubs,
                onStudents,
                onClose,
                arcSite
              )
            }
          })
          .catch(() => {
            onClose()
          })
      } else {
        AfterLoginRegister(
          EMAIL_USER,
          typeDialog,
          typeForm,
          provider,
          siteDomain,
          onLogged,
          resProfile,
          checkUserSubs,
          onStudents,
          onClose,
          arcSite
        )
      }
    })
    .catch(() => {
      onClose()
    })
}

const authSocialProviderURL = (
  { data, origin },
  arcSite,
  onClose,
  activeNewsletter,
  typeDialog,
  typeForm,
  onLogged,
  checkUserSubs,
  onStudents,
  dataTreatment
) => {
  if (origin !== getUrlECOID || Identity.userIdentity.uuid) {
    return
  }

  loginFBeco(getOriginAPI(arcSite), '', data.accessToken, data.providerSource)
    .then((resLogSocial) => {
      if (resLogSocial.accessToken) {
        window.localStorage.setItem(
          'ArcId.USER_INFO',
          JSON.stringify(resLogSocial)
        )
        Identity.userIdentity = resLogSocial
        setupUserProfile(
          resLogSocial.accessToken,
          data.providerSource,
          arcSite,
          onClose,
          activeNewsletter,
          typeDialog,
          typeForm,
          onLogged,
          checkUserSubs,
          onStudents,
          dataTreatment
        )
      } else {
        onClose()
      }
    })
    .catch(() => {
      window.console.error('oups ocurrio un error')
    })
}

export const ButtonSocial = ({
  typeDialog,
  brand,
  size,
  defaultSize,
  onLogged = (i) => i,
  onClose,
  onStudents,
  arcSite,
  typeForm,
  activeNewsletter,
  checkUserSubs,
  showMsgVerify,
  dataTreatment,
}) => {
  const [showTextLoad, setShowTextLoad] = React.useState('')

  const queryDialog = () => {
    switch (typeDialog) {
      case 'organico':
        return 'signOrganic'
      case 'hard':
        return 'signHard'
      case 'relogemail':
        return 'signEmail'
      case 'reloghash':
        return 'signHash'
      case 'banner':
        return 'banner'
      case 'paywall':
        return 'signPaywall'
      case 'premium':
        return 'signPremium'
      case 'landing':
        return 'signLanding'
      case 'authfia':
        return 'signFia'
      case 'newsletter':
        return 'signNewsletters'
      case 'students':
        return 'signStudents'
      default:
        return typeDialog
    }
  }

  const taggeoError = (resProvider) => {
    Taggeo(
      `Web_Sign_Wall_${typeDialog}`,
      `web_sw${typeDialog[0]}_${typeForm}_error_${resProvider}`,
      arcSite
    )
  }

  const authSocialProvider = ({ data, origin }) => {
    if (origin !== getUrlECOID || Identity.userIdentity.uuid) {
      return
    }

    setShowTextLoad('Conectando...')

    loginFBeco(
      getOriginAPI(arcSite),
      '',
      data.accessToken,
      data.providerSource
    ).then((resLogSocial) => {
      if (resLogSocial.accessToken) {
        window.localStorage.setItem(
          'ArcId.USER_INFO',
          JSON.stringify(resLogSocial)
        )
        Identity.userIdentity = resLogSocial

        setShowTextLoad('Cargando...')
        setupUserProfile(
          resLogSocial.accessToken,
          data.providerSource,
          arcSite,
          onClose,
          activeNewsletter,
          typeDialog,
          typeForm,
          onLogged,
          checkUserSubs,
          onStudents,
          dataTreatment
        )
      } else {
        taggeoError(data.providerSource)
        if (resLogSocial.code && resLogSocial.code === '130051') {
          showMsgVerify()
          setShowTextLoad('')
        } else {
          onClose()
        }
        window.removeEventListener('message', authSocialProvider)
        window.removeEventListener('onmessage', authSocialProvider)
      }
    })
  }

  const clickLoginSocialEcoID = (brandCurrent) => {
    const eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent'
    const eventer = window[eventMethod]
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message'
    eventer(messageEvent, authSocialProvider)

    const width = 780
    const height = 640
    const left = window.screen.width / 2 - 800 / 2
    const top = window.screen.height / 2 - 600 / 2
    const URL = `${getUrlECOID}/mpp/${brandCurrent}/login/`

    const URLRedirect = () => {
      window.location.href = `${URL}?urlReference=${encodeURIComponent(
        window.location.href
      )}&typeModal=${queryDialog()}&dataTreatment=${dataTreatment}`

      setShowTextLoad('Conectando...')
    }

    const URLWindow = () => {
      window.open(
        URL,
        '',
        `toolbar=no, location=no, directories=no, status=no, menubar=no, 
    scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
    height=${height}, top=${top}, left=${left}`
      )
    }

    if (brandCurrent === 'google') return URLWindow()

    return isFbBrowser ? URLRedirect() : URLWindow()
    // return URLRedirect()
  }

  return (
    <button
      className={`signwall-inside_forms-btn-social ${brand} ${size}
      ${defaultSize || `${brand}-${size}`} 
      ${arcSite === 'trome' ? `trome-${brand}` : ''}`}
      type="button"
      id={`btn-sign-${brand}`}
      disabled={showTextLoad}
      onClick={() => {
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_${typeForm}_boton_${brand}`,
          arcSite
        )
        clickLoginSocialEcoID(brand)
      }}>
      {arcSite !== 'trome' && (
        <>{brand === 'facebook' ? <Facebook /> : <Google />}</>
      )}

      {arcSite !== 'trome' ? showTextLoad || brand : ''}
    </button>
  )
}

export const ButtonEmail = ({ size, onClick }) => (
  <button
    className="signwall-inside_forms-btn-email"
    type="button"
    size={size}
    onClick={onClick}>
    <Mail />
    Ingresa con tu usuario
  </button>
)

export const AuthURL = ({
  arcSite,
  onClose,
  activeNewsletter,
  typeDialog,
  typeForm,
  onLogged = (i) => i,
  checkUserSubs,
  onStudents,
}) => {
  const authUrlRedirect = () => {
    const listUrlRedirect = [
      'signOrganic',
      'signHard',
      'signEmail',
      'signHash',
      'signPaywall',
      'signPremium',
      'signLanding',
      'signFia',
      'signNewsletters',
      'signStudents',
    ]

    listUrlRedirect.forEach((item) => {
      if (getQuery(item)) {
        setTimeout(() => {
          const btnFacebook = document.getElementById('btn-sign-facebook')
          if (btnFacebook) {
            btnFacebook.disabled = true
          }
        }, 800)

        const dataTreatment = getQuery('dataTreatment') || 'NULL'

        authSocialProviderURL(
          {
            data: {
              accessToken: getQuery(item).replace(/(#_=_)$/, ''),
              providerSource: 'facebook',
            },
            origin: getUrlECOID,
          },
          arcSite,
          onClose,
          activeNewsletter,
          typeDialog,
          typeForm,
          onLogged,
          checkUserSubs,
          onStudents,
          dataTreatment
        )
      }
    })
  }

  return <>{authUrlRedirect()}</>
}
