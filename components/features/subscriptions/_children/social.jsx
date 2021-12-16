import Identity from '@arc-publishing/sdk-identity'
import PropTypes from 'prop-types'
import * as React from 'react'

import { useAuthContext } from '../_context/auth'
import getDevice from '../_dependencies/GetDevice'
import { PropertiesCommon, PropertiesSite } from '../_dependencies/Properties'
import { loginSocialEco, sendNewsLettersUser } from '../_dependencies/Services'
import { Taggeo } from '../_dependencies/Taggeo'
import {
  Capitalize,
  isFbBrowser,
  setLocaleStorage,
} from '../_dependencies/Utils'

const ButtonSocial = ({
  arcSocial,
  arcSite,
  arcType,
  showMsgVerify,
  dataTreatment,
  typeDialog,
}) => {
  const [loading, setLoading] = React.useState(false)
  const [loadText, setLoadText] = React.useState('Cargando...')
  const { activateAuth, updateStep } = useAuthContext()
  const { urls } = PropertiesCommon
  const { urls: urlSite } = PropertiesSite[arcSite]

  const nameTagCategory = `Web_Sign_Wall_${typeDialog}`

  const setupUserProfile = () => {
    if (typeof window !== 'undefined') {
      setLoadText('Cargando Perfil...')
      Identity.getUserProfile()
        .then((resProfile) => {
          const userEmail =
            resProfile.email ||
            `${resProfile.identities[0].userName}@${arcSocial}.com`

          if (!resProfile.attributes) {
            const newProfileFB = {
              firstName: resProfile.firstName.replace(/\./g, ''),
              lastName: resProfile.lastName.replace(/\./g, ''),
              displayName: userEmail,
              email: userEmail,
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
                  value: arcSocial === 'facebook' ? '2' : '5',
                  type: 'String',
                },
                {
                  name: 'originDevice',
                  value: getDevice(window) || 'none',
                  type: 'String',
                },
                {
                  name: 'originAction',
                  value: typeDialog || 'landing',
                  type: 'String',
                },
                {
                  name: 'termsCondPrivaPoli',
                  value: '1',
                  type: 'String',
                },
                {
                  name: 'dataTreatment',
                  value:
                    dataTreatment &&
                    (arcSite === 'elcomercio' || arcSite === 'gestion')
                      ? dataTreatment
                      : 'NULL',
                  type: 'String',
                },
              ],
            }
            setLoadText('Actualizando Perfil...')
            Identity.updateUserProfile(newProfileFB)
              .then((resUpdateProfile) => {
                if (userEmail.indexOf('facebook.com') < 0) {
                  setLoadText('Cargando Servicios...')
                  sendNewsLettersUser(
                    urls.newsLetters,
                    resUpdateProfile.uuid,
                    userEmail,
                    arcSite,
                    Identity.userIdentity.accessToken,
                    ['general']
                  )
                    .then(() => {
                      activateAuth(resUpdateProfile)
                      updateStep(2)
                      Taggeo(
                        nameTagCategory,
                        `web_sw${typeDialog[0]}_${arcType}_success_${arcSocial}`,
                        arcSite
                      )
                    })
                    .catch(() => {
                      setLoading(false)
                    })
                } else {
                  activateAuth(resUpdateProfile)
                  updateStep(2)
                  Taggeo(
                    nameTagCategory,
                    `web_sw${typeDialog[0]}_${arcType}_success_${arcSocial}`,
                    arcSite
                  )
                }
              })
              .catch((errUpdateProfile) => {
                setLoading(false)
                window.console.error(errUpdateProfile) // Temporal hasta implementar Sentry
                Taggeo(
                  nameTagCategory,
                  `web_sw${typeDialog[0]}_${arcType}_error_${arcSocial}`,
                  arcSite
                )
              })
          } else {
            activateAuth(resProfile)
            updateStep(2)
            Taggeo(
              nameTagCategory,
              `web_sw${typeDialog[0]}_${arcType}_success_${arcSocial}`,
              arcSite
            )
          }
        })
        .catch((errProfile) => {
          setLoading(false)
          window.console.error(errProfile) // Temporal hasta implementar Sentry
          Taggeo(
            nameTagCategory,
            `web_sw${typeDialog[0]}_${arcType}_error_${arcSocial}`,
            arcSite
          )
        })
    }
  }

  const authSocialProvider = ({ data, origin }) => {
    if (typeof window !== 'undefined') {
      if (origin !== urls.ecoID || Identity.userIdentity.uuid) {
        setLoading(false)
        return
      }
      setLoading(true)
      setLoadText('Conectando...')
      loginSocialEco(
        urlSite.arcOrigin,
        '',
        data.accessToken,
        data.providerSource
      )
        .then((resloginSocialEco) => {
          if (resloginSocialEco.accessToken) {
            setLocaleStorage('ArcId.USER_INFO', resloginSocialEco)
            Identity.userIdentity = resloginSocialEco
            setupUserProfile()
          } else {
            if (resloginSocialEco.code && resloginSocialEco.code === '130051') {
              showMsgVerify()
            }
            setLoading(false)
            window.removeEventListener('message', authSocialProvider)
            window.removeEventListener('onmessage', authSocialProvider)
          }
        })
        .catch((errloginSocialEco) => {
          setLoading(false)
          window.console.error(errloginSocialEco) // Temporal hasta implementar Sentry
        })
    }
  }

  const queryDialog = () => {
    switch (arcType) {
      case 'organico':
        return 'signOrganic'
      case 'hard':
        return 'signHard'
      case 'relogemail':
        return 'signEmail'
      case 'reloghash':
        return 'signHash'
      case 'paywall':
        return 'signPaywall'
      case 'premium':
        return 'signPremium'
      case 'login':
      case 'registro':
      case 'landing':
        return 'signLanding'
      case 'authfia':
        return 'signFia'
      case 'newsletter':
        return 'signNewsletters'
      case 'students':
        return 'signStudents'
      default:
        return arcType
    }
  }

  const clickLoginSocialEcoID = () => {
    if (typeof window !== 'undefined') {
      Taggeo(
        nameTagCategory,
        `web_sw${typeDialog[0]}_${arcType}_boton_${arcSocial}`,
        arcSite
      )

      const width = 780
      const height = 640
      const left = window.screen.width / 2 - 800 / 2
      const top = window.screen.height / 2 - 600 / 2
      const URL = `${urls.ecoID}/mpp/${arcSocial}/login/`

      const URLRedirect = () => {
        setLoading(true)
        setLoadText('Redireccionando...')
        window.location.href = `${URL}?urlReference=${encodeURIComponent(
          window.location.href
        )}&typeModal=${queryDialog()}&dataTreatment=${dataTreatment}`
      }

      const URLWindow = () => {
        const eventMethod = window.addEventListener
          ? 'addEventListener'
          : 'attachEvent'
        const eventer = window[eventMethod]
        const messageEvent =
          eventMethod === 'attachEvent' ? 'onmessage' : 'message'
        eventer(messageEvent, authSocialProvider)

        window.open(
          URL,
          '',
          `toolbar=no, location=no, directories=no, status=no, menubar=no, 
        scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
        height=${height}, top=${top}, left=${left}`
        )
      }

      if (arcSocial === 'google') return URLWindow()

      return isFbBrowser ? URLRedirect() : URLWindow()
      // return URLRedirect()
    }
    return ''
  }

  React.useEffect(
    () =>
      // window.addEventListener('click', clickLoginSocialEcoID)
      () => {
        // window.removeEventListener('click', clickLoginSocialEcoID)
        window.removeEventListener('message', authSocialProvider)
        window.removeEventListener('onmessage', authSocialProvider)
      },
    []
  )

  return (
    <button
      className={`btn-${arcSocial}`}
      id={`btn-sign-${arcSocial}`}
      onClick={clickLoginSocialEcoID}
      disabled={loading}
      type="button">
      {loading ? loadText : `Continua con ${Capitalize(arcSocial)}`}
    </button>
  )
}

ButtonSocial.propTypes = {
  arcSocial: PropTypes.string.isRequired,
  arcSite: PropTypes.string.isRequired,
  arcType: PropTypes.string.isRequired,
}

export default ButtonSocial
