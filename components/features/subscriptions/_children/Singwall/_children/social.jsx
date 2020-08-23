/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useState, useEffect } from 'react'
import {
  loginSocialEco,
  sendNewsLettersUser,
} from '../../../_dependencies/Services'
import PropertiesSite from '../../../_dependencies/Properties'
import getDevice from '../../../_dependencies/GetDevice'
import { Capitalize, setLocaleStorage } from '../../../_dependencies/Utils'
import { AuthContext } from '../../../_context/auth'
import { Taggeo } from '../../../_dependencies/Taggeo'

const nameTagCategory = 'Web_Sign_Wall_Landing'

const ButtonSocial = ({ arcSocial, arcSite, arcEnv, arcType }) => {
  const [loading, setLoading] = useState()
  const [loadText, setLoadText] = useState('Cargando...')
  const { activateAuth, updateStep } = useContext(AuthContext)
  const { urls } = PropertiesSite.common
  const { urls: urlSite } = PropertiesSite[arcSite]

  const setupUserProfile = () => {
    if (typeof window !== 'undefined') {
      setLoadText('Cargando Perfil...')
      window.Identity.options({ apiOrigin: urlSite.arcOrigin[arcEnv] })
      window.Identity.getUserProfile()
        .then(resProfile => {
          const userEmail =
            resProfile.email ||
            `${resProfile.identities[0].userName}@${arcSocial}.com`

          if (!resProfile.displayName && !resProfile.attributes) {
            const newProfileFB = {
              firstName: resProfile.firstName.replace(/\./g, ''), // aveces llegan nombres con .
              lastName: resProfile.lastName.replace(/\./g, ''), // aveces llegan nombres con .
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
                    urls.newsLetters[arcEnv],
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
      if (origin !== urls.ecoID[arcEnv] || window.Identity.userIdentity.uuid) {
        setLoading(false)
        return
      }
      setLoading(true)
      setLoadText('Conectando...')
      loginSocialEco(
        urlSite.arcOrigin[arcEnv],
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

  const clickLoginSocialEcoID = () => {
    if (typeof window !== 'undefined') {
      const eventMethod = window.addEventListener
        ? 'addEventListener'
        : 'attachEvent'
      const eventer = window[eventMethod]
      const messageEvent =
        eventMethod === 'attachEvent' ? 'onmessage' : 'message'
      eventer(messageEvent, authSocialProvider)

      const isFbBrowser =
        window.navigator.userAgent.indexOf('FBAN') > -1 ||
        window.navigator.userAgent.indexOf('FBAV') > -1

      const width = 780
      const height = 640
      const left = window.screen.width / 2 - 800 / 2
      const top = window.screen.height / 2 - 600 / 2
      const URL = `${urls.ecoID[arcEnv]}/mpp/${arcSocial}/login/`

      const URLRedirect = () => {
        window.location.href = `${URL}?urlReference=${encodeURIComponent(
          window.location.href
        )}`
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
      return isFbBrowser ? URLRedirect() : URLWindow()
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

export default ButtonSocial
