import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  PropertiesSite,
  PropertiesCommon,
} from '../../../../_dependencies/Properties'
import getDevice from '../../../../_dependencies/GetDevice'
import {
  Capitalize,
  setLocaleStorage,
  isFbBrowser,
} from '../../../../_dependencies/Utils'
import { AuthContext } from '../../../../_context/auth'
import { Taggeo } from '../../../../_dependencies/Taggeo'
import {
  loginSocialEco,
  sendNewsLettersUser,
} from '../../../../_dependencies/Services'

const nameTagCategory = 'Web_Sign_Wall_Landing'

const ButtonSocial = ({ arcSocial, arcSite, arcType }) => {
  const [loading, setLoading] = useState()
  const [loadText, setLoadText] = useState('Cargando...')
  const { activateAuth, updateStep } = useContext(AuthContext)
  const { urls } = PropertiesCommon
  const { urls: urlSite } = PropertiesSite[arcSite]

  const setupUserProfile = () => {
    if (typeof window !== 'undefined') {
      setLoadText('Cargando Perfil...')
      window.Identity.options({ apiOrigin: urlSite.arcOrigin })
      window.Identity.getUserProfile()
        .then(resProfile => {
          const userEmail =
            resProfile.email ||
            `${resProfile.identities[0].userName}@${arcSocial}.com`

          if (!resProfile.displayName && !resProfile.attributes) {
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
                  value: 'landing',
                  type: 'String',
                },
                {
                  name: 'termsCondPrivaPoli',
                  value: '1',
                  type: 'String',
                },
              ],
            }
            setLoadText('Actualizando Perfil...')
            window.Identity.updateUserProfile(newProfileFB)
              .then(resUpdateProfile => {
                if (userEmail.indexOf('facebook.com') < 0) {
                  setLoadText('Cargando Servicios...')
                  sendNewsLettersUser(
                    urls.newsLetters,
                    resUpdateProfile.uuid,
                    userEmail,
                    arcSite,
                    window.Identity.userIdentity.accessToken,
                    ['general']
                  )
                    .then(() => {
                      activateAuth(resUpdateProfile)
                      updateStep(2)
                      Taggeo(
                        nameTagCategory,
                        `web_swl_${arcType}_success_${arcSocial}`
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
                    `web_swl_${arcType}_success_${arcSocial}`
                  )
                }
              })
              .catch(errUpdateProfile => {
                setLoading(false)
                window.console.error(errUpdateProfile) // Temporal hasta implementar Sentry
                Taggeo(nameTagCategory, `web_swl_${arcType}_error_${arcSocial}`)
              })
          } else {
            activateAuth(resProfile)
            updateStep(2)
            Taggeo(nameTagCategory, `web_swl_${arcType}_success_${arcSocial}`)
          }
        })
        .catch(errProfile => {
          setLoading(false)
          window.console.error(errProfile) // Temporal hasta implementar Sentry
          Taggeo(nameTagCategory, `web_swl_${arcType}_error_${arcSocial}`)
        })
    }
  }

  const authSocialProvider = ({ data, origin }) => {
    if (typeof window !== 'undefined') {
      if (origin !== urls.ecoID || window.Identity.userIdentity.uuid) {
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
        .then(resloginSocialEco => {
          if (resloginSocialEco.accessToken) {
            setLocaleStorage('ArcId.USER_INFO', resloginSocialEco)
            window.Identity.userIdentity = resloginSocialEco
            setupUserProfile()
          } else {
            window.removeEventListener('message', authSocialProvider)
            window.removeEventListener('onmessage', authSocialProvider)
          }
        })
        .catch(errloginSocialEco => {
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
      const eventMethod = window.addEventListener
        ? 'addEventListener'
        : 'attachEvent'
      const eventer = window[eventMethod]
      const messageEvent =
        eventMethod === 'attachEvent' ? 'onmessage' : 'message'
      eventer(messageEvent, authSocialProvider)

      const width = 780
      const height = 640
      const left = window.screen.width / 2 - 800 / 2
      const top = window.screen.height / 2 - 600 / 2
      const URL = `${urls.ecoID}/mpp/${arcSocial}/login/`

      const URLRedirect = () => {
        window.location.href = `${URL}?urlReference=${encodeURIComponent(
          window.location.href
        )}&typeModal=${queryDialog()}`
        setLoadText('Redireccionando...')
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

      if (arcSocial === 'google') return URLWindow()

      // return getDevice(window) !== 'desktop' ? URLRedirect() : URLWindow()
      return isFbBrowser() ? URLRedirect() : URLWindow()
    }
    return ''
  }

  useEffect(() => {
    // window.addEventListener('click', clickLoginSocialEcoID)
    return () => {
      // window.removeEventListener('click', clickLoginSocialEcoID)
      window.removeEventListener('message', authSocialProvider)
      window.removeEventListener('onmessage', authSocialProvider)
    }
  }, [])

  return (
    <>
      <button
        className={`btn-${arcSocial}`}
        onClick={() => {
          clickLoginSocialEcoID()
          Taggeo(nameTagCategory, `web_swl_${arcType}_boton_${arcSocial}`)
        }}
        disabled={loading}
        type="button">
        {loading ? loadText : `Continua con ${Capitalize(arcSocial)}`}
      </button>
    </>
  )
}

ButtonSocial.propTypes = {
  arcSocial: PropTypes.string.isRequired,
  arcSite: PropTypes.string.isRequired,
  arcType: PropTypes.string.isRequired,
}

export default ButtonSocial
