import Identity from '@arc-publishing/sdk-identity'
import PropTypes from 'prop-types'
import * as React from 'react'

import Loading from '../../signwall/_children/loading'
import getCodeError, { formatEmail } from '../_dependencies/Errors'
import getDevice from '../_dependencies/GetDevice'
import { PropertiesCommon } from '../_dependencies/Properties'
import { sendNewsLettersUser } from '../_dependencies/Services'
import { Taggeo } from '../_dependencies/Taggeo'
import { isFbBrowser } from '../_dependencies/Utils'
import useForm from '../_hooks/useForm'
import ButtonSocial from './social'

const styles = {
  center: 'step__left-align-center',
  imgfb: 'step__left-img-facebok',
  title: 'step__left-title',
  textblock: 'step__left-textblock',
  textnotice: 'step__left-text-notice',
  leftBlock: 'step__left-block',
  btnnext: 'step__left-btn-next',
  link: 'step__btn-link',
  linkregister: 'step__left-link-register',
  formFacebok: 'form-email-facebok',
  blockMiddle: 'step__left-block-middle',
  blockFull: 'step__left-block-full',
}

const AuthFacebookGoogle = ({
  hideFormParent,
  onAuthSuccess,
  onAuthFailed,
  typeDialog,
  dataTreatment,
  arcSite,
  arcType,
  activeNewsletter,
  showMsgVerify,
}) => {
  const [showFormFacebook, setShowFormFacebook] = React.useState()
  const [loading, setLoading] = React.useState()
  const [msgError, setMsgError] = React.useState()
  const [verifyEmailFb, setVerifyEmailFb] = React.useState()
  const [showSendEmail, setShowSendEmail] = React.useState()
  const [loadingSocial, setLoadingSocial] = React.useState()
  const { texts, urls, links } = PropertiesCommon

  const stateSchema = {
    femail: { value: '' || '', error: '' },
  }

  const stateValidatorSchema = {
    femail: {
      required: true,
      validator: formatEmail(),
    },
  }

  const nameTagCategory = `Web_Sign_Wall_${typeDialog}`
  const arcSocial = 'facebook'

  const checkStatusForms = (emailArc, emailVerified, name, id) => {
    if (emailArc && emailVerified) {
      onAuthSuccess()
      Taggeo(
        nameTagCategory,
        `web_sw${typeDialog[0]}_${arcType}_success_${arcSocial}`
      )
    } else if (emailArc && !emailVerified) {
      setLoadingSocial(false)
      hideFormParent(true)
      setShowFormFacebook({ name, id })
      setVerifyEmailFb(emailArc)
    } else {
      setLoadingSocial(false)
      hideFormParent(true)
      setShowFormFacebook({ name, id })
    }
  }

  const authFailed = () => {
    onAuthFailed()
    Taggeo(
      nameTagCategory,
      `web_sw${typeDialog[0]}_${arcType}_error_${arcSocial}`
    )
  }

  React.useEffect(() => {
    Identity.initFacebookLogin(links.facebookKey, 'es_ES')
    if (!window.onFacebookSignOn) {
      window.onFacebookSignOn = async () => {
        try {
          setLoadingSocial(true)
          Taggeo(
            nameTagCategory,
            `web_sw${typeDialog[0]}_${arcType}_boton_${arcSocial}`
          )
          await Identity.facebookSignOn().then((res) => {
            const { accessToken } = res || {}
            if (!accessToken) return
            window.FB.api(
              '/me',
              { locale: 'es_ES', fields: 'id, name, email' },
              ({ email, name, id }) => {
                Identity.getUserProfile()
                  .then(
                    ({ uuid, attributes, email: emailArc, emailVerified }) => {
                      if (attributes) {
                        checkStatusForms(emailArc, emailVerified, name, id)
                      } else {
                        Identity.updateUserProfile({
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
                                  .replace(/(\/|=|#|\/#|#\/|=\/|\/=)$/, '') ||
                                'none',
                              type: 'String',
                            },
                            {
                              name: 'originMethod',
                              value: '2', // only facebok
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
                                (arcSite === 'elcomercio' ||
                                  arcSite === 'gestion')
                                  ? dataTreatment
                                  : 'NULL',
                              type: 'String',
                            },
                          ],
                        })
                          .then(() => {
                            checkStatusForms(emailArc, emailVerified, name, id)
                            if (email && activeNewsletter) {
                              sendNewsLettersUser(
                                urls.newsLetters,
                                uuid,
                                email,
                                arcSite,
                                accessToken,
                                ['general']
                              )
                            }
                          })
                          .catch(() => {
                            setLoadingSocial(false)
                            authFailed()
                          })
                      }
                    }
                  )
                  .catch(() => {
                    setLoadingSocial(false)
                    authFailed()
                  })
              }
            )
          })
        } catch (e) {
          setLoadingSocial(false)
          window.console.error(e.message)
        }
      }
    }

    // const btnGoogle = document.getElementById('google-sign-in-button')
    // if (btnGoogle) {
    //   Identity.initGoogleLogin(
    //     `${links.googleKey}.apps.googleusercontent.com`,
    //     {
    //       width: 300,
    //       height: 40,
    //       theme: 'dark',
    //       onSuccess: () => {
    //         onAuthSuccess()
    //       },
    //     }
    //   ).then(() => {
    //     setTimeout(() => {
    //       const textGoogle = btnGoogle.getElementsByTagName('span')
    //       if (textGoogle) textGoogle[0].innerHTML = 'Iniciar sesión con Google'
    //     }, 200)
    //   })
    // }
  }, [])

  const onFormEmailFacebook = ({ femail }) => {
    setLoading(true)
    setMsgError(false)
    Identity.updateUserProfile({
      email: femail,
    })
      .then(({ emailVerified, email }) => {
        if (!emailVerified) {
          setVerifyEmailFb(email)
        } else {
          onAuthSuccess()
        }
      })
      .catch((err) => {
        setMsgError(getCodeError(err.code))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const {
    values: { femail },
    errors: { femail: femailError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFormEmailFacebook)

  const handleChangeInput = (e) => {
    handleOnChange(e)
    setMsgError(false)
  }

  const handleCheckProfile = () => {
    setLoading(true)
    setMsgError(false)
    Identity.getUserProfile().then(({ email, emailVerified }) => {
      if (email && emailVerified) {
        onAuthSuccess()
      } else {
        setLoading(false)
        setMsgError(getCodeError('130051'))
      }
    })
  }

  const sendVerifyEmail = () => {
    setShowSendEmail(true)
    Identity.requestVerifyEmail(verifyEmailFb)
    Taggeo(nameTagCategory, `web_sw${typeDialog[0]}_registro_reenviar_correo`)
    let timeleft = 9
    const downloadTimer = setInterval(() => {
      if (timeleft <= 0) {
        clearInterval(downloadTimer)
        setShowSendEmail(false)
      } else {
        const divCount = document.getElementById('countdown')
        if (divCount) divCount.innerHTML = ` ${timeleft} `
      }
      timeleft -= 1
    }, 1000)
  }

  return (
    <>
      {showFormFacebook ? (
        <div className={styles.center}>
          <img
            src={`https://graph.facebook.com/${showFormFacebook.id}/picture?type=normal`}
            alt="img-facebook"
            className={styles.imgfb}
          />
          <h2 className={styles.title}>Hola, {showFormFacebook.name}</h2>
          {verifyEmailFb ? (
            <>
              <span className={styles.textblock}>{verifyEmailFb}</span>
              {msgError && (
                <div className={styles.leftBlock}>
                  <div className="msg-alert">{` ${msgError} `}</div>
                </div>
              )}
              <h3 className={styles.textnotice}>{texts.checkInbox}</h3>
              <div className={styles.leftBlock}>
                <button
                  type="button"
                  className={styles.btnnext}
                  disabled={loading}
                  onClick={handleCheckProfile}>
                  {loading ? 'Verificando..' : 'Continuar'}
                </button>
              </div>
              <p className={styles.linkregister}>
                {texts.notReceiptEmail}
                <br />
                {!showSendEmail ? (
                  <button
                    className={styles.link}
                    type="button"
                    onClick={sendVerifyEmail}>
                    {texts.reSendEmail}
                  </button>
                ) : (
                  <span>
                    {texts.youCanSendEmail}
                    <strong id="countdown"> 10 </strong> segundos
                  </span>
                )}
              </p>
            </>
          ) : (
            <>
              <h3 className={styles.textnotice}>{texts.titleContinue}</h3>
              {msgError && (
                <div className={styles.leftBlock}>
                  <div className="msg-alert">{` ${msgError} `}</div>
                </div>
              )}
              <form className={styles.formFacebok} onSubmit={handleOnSubmit}>
                <div className={styles.leftBlock}>
                  <label htmlFor="femail">
                    Correo electrónico
                    <input
                      className={femailError && 'input-error'}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      name="femail"
                      value={femail}
                      required
                      maxLength="80"
                      onChange={handleChangeInput}
                      onBlur={handleOnChange}
                      disabled={loading}
                    />
                    {femailError && (
                      <span className="msn-error">{femailError}</span>
                    )}
                  </label>
                </div>
                <div className={styles.leftBlock}>
                  <button
                    type="submit"
                    className={styles.btnnext}
                    disabled={disable || loading}>
                    {loading ? 'Verificando...' : 'Continuar'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      ) : (
        <>
          {loadingSocial && <Loading typeBg="full-transparent" />}
          <div
            className="fb-login-button"
            data-width="300"
            data-size="large"
            data-button-type="login_with"
            data-scope="public_profile,email"
            data-auto-logout-link="false"
            data-use-continue-as="true"
            data-onlogin="window.onFacebookSignOn()"
          />
          {!isFbBrowser && (
            <div className={`${styles.blockMiddle} ${styles.blockFull}`}>
              <ButtonSocial
                arcSocial="google"
                arcSite={arcSite}
                arcType={arcType}
                showMsgVerify={() => showMsgVerify()}
                dataTreatment={dataTreatment}
                typeDialog={typeDialog}
              />
            </div>
          )}
          {/* <div id="google-sign-in-button" /> */}
        </>
      )}
    </>
  )
}

AuthFacebookGoogle.propTypes = {
  hideFormParent: PropTypes.func.isRequired,
  onAuthSuccess: PropTypes.func.isRequired,
  onAuthFailed: PropTypes.func.isRequired,
  typeDialog: PropTypes.string.isRequired,
  dataTreatment: PropTypes.string.isRequired,
  arcSite: PropTypes.string.isRequired,
  arcType: PropTypes.string.isRequired,
  activeNewsletter: PropTypes.bool.isRequired,
  showMsgVerify: PropTypes.func.isRequired,
}

export default AuthFacebookGoogle
