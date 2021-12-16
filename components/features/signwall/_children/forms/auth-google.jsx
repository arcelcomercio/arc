/* eslint-disable jsx-a11y/anchor-is-valid */
import Identity from '@arc-publishing/sdk-identity'
import sha256 from 'crypto-js/sha256'
import getProperties from 'fusion:properties'
import * as React from 'react'

import { setCookie } from '../../../../utilities/client/cookies'
import addScriptAsync from '../../../../utilities/script-async'
import getDevice from '../../../subscriptions/_dependencies/GetDevice'
import { PropertiesCommon } from '../../../subscriptions/_dependencies/Properties'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import { getOriginAPI } from '../../_dependencies/domains'
import { loginFBeco, sendNewsLettersUser } from '../../_dependencies/services'
import Loading from '../loading'

const AuthGoogle = ({
  arcSite,
  onClose,
  typeDialog,
  typeForm,
  activeNewsletter,
  checkUserSubs,
  onLogged = (i) => i,
  dataTreatment,
  onStudents,
}) => {
  const [loadingSocial, setLoadingSocial] = React.useState(false)
  const { links } = PropertiesCommon

  const originAction = (dialogModal) => {
    switch (dialogModal) {
      case 'organico' || 'banner' || 'promoMetro':
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

  const AfterLoginRegister = (emailUser, provider, siteDomain, resProfile) => {
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
        setLoadingSocial(false)
        break
      default:
        onClose()
        setLoadingSocial(false)
    }
  }

  const setupUserProfile = (resAccessToken, provider) => {
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
                value:
                  dataTreatment &&
                  (arcSite === 'elcomercio' ||
                    arcSite === 'gestion' ||
                    arcSite === 'trome' ||
                    arcSite === 'ojo' ||
                    arcSite === 'diariocorreo' ||
                    arcSite === 'peru21' ||
                    arcSite === 'peru21g21')
                    ? dataTreatment
                    : 'NULL',
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
                      provider,
                      siteDomain,
                      resProfile
                    )
                  })
                  .catch(() => {
                    setLoadingSocial(false)
                    onClose()
                  })
              } else {
                AfterLoginRegister(EMAIL_USER, provider, siteDomain, resProfile)
              }
            })
            .catch(() => {
              setLoadingSocial(false)
              onClose()
            })
        } else {
          AfterLoginRegister(EMAIL_USER, provider, siteDomain, resProfile)
        }
      })
      .catch(() => {
        setLoadingSocial(false)
        onClose()
      })
  }

  const handleCredentialResponse = (response) => {
    setLoadingSocial(true)
    loginFBeco(getOriginAPI(arcSite), '', response.credential, 'google')
      .then((resArc) => {
        if (resArc.accessToken) {
          window.localStorage.setItem('ArcId.USER_INFO', JSON.stringify(resArc))
          Identity.userIdentity = resArc

          setupUserProfile(resArc.accessToken, 'google')
        } else {
          setLoadingSocial(false)
          onClose()
        }
      })
      .catch((errArc) => {
        setLoadingSocial(false)
        window.console.error('error', errArc)
      })
  }

  React.useEffect(() => {
    addScriptAsync({
      name: 'GoogleSDK',
      url: 'https://accounts.google.com/gsi/client',
      includeNoScript: false,
    })
      .then(() => {
        window.google.accounts.id.initialize({
          client_id: `${links.googleKey}.apps.googleusercontent.com`,
          callback: handleCredentialResponse,
        })

        window.google.accounts.id.renderButton(
          document.getElementById('buttonDiv'),
          {
            theme: 'filled_blue',
            size: 'large',
            text: 'continue_with',
            width: 240,
          } // customization attributes
        )

        // window.google.accounts.id.prompt();// also display the One Tap dialog
      })
      .catch((errGoogleSDK) => {
        window.console.error('no cargo SDK', errGoogleSDK)
      })
  }, [])

  return (
    <>
      {loadingSocial && <Loading typeBg="full-transparent" />}
      <div
        id="buttonDiv"
        style={{
          margin: '0 auto 10px auto',
          width: '240px',
        }}
      />
    </>
  )
}

export default AuthGoogle
