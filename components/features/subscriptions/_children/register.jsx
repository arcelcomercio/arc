import React, {
  useState,
  // useContext
} from 'react'
import PropTypes from 'prop-types'
import { NavigateConsumer } from '../_context/navigate'
import useForm from '../_hooks/useForm'
// import { AuthContext } from '../_context/auth'
import getDevice from '../_dependencies/GetDevice'
import { PropertiesSite, PropertiesCommon } from '../_dependencies/Properties'
import { sendNewsLettersUser } from '../_dependencies/Services'
import ButtonSocial from './social'
import { Taggeo } from '../_dependencies/Taggeo'
import getCodeError, {
  formatEmail,
  acceptCheckTerms,
} from '../_dependencies/Errors'
import { MsgRegister } from '../_dependencies/Icons'
import { isFbBrowser } from '../_dependencies/Utils'

const styles = {
  title: 'step__left-title',
  blockMiddle: 'step__left-block-middle',
  titleLine: 'step__left-title-line',
  block: 'step__left-block',
  blockFull: 'step__left-block-full',
  btnShow: 'step__left-btn-show',
  btn: 'step__left-btn-next',
  link: 'step__btn-link',
  backLogin: 'step__left-link-register',
  center: 'step__left-align-center',
  subTitle: 'step__left-subtitle',
  textBlock: 'step__left-textblock',
}

const nameTagCategory = 'Web_Sign_Wall_Landing'

const Register = ({ arcSite }) => {
  // const { activateAuth, updateStep } = useContext(AuthContext)
  const [loading, setLoading] = useState()
  const [loadText, setLoadText] = useState('Cargando...')
  const [msgError, setMsgError] = useState()
  const [checkedTerms, setCheckedTerms] = useState()
  const [forgotLink, setForgotLink] = useState()
  const [showHidePass, setShowHidePass] = useState('password')
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSendEmail, setShowSendEmail] = useState(false)
  const { texts, urls } = PropertiesCommon
  const { urls: urlSite } = PropertiesSite[arcSite]

  const stateSchema = {
    remail: { value: '', error: '' },
    rpass: { value: '', error: '' },
    rterms: { value: 'no', error: '' },
  }

  const stateValidatorSchema = {
    remail: {
      required: true,
      validator: formatEmail(),
    },
    rpass: {
      required: true,
      validator: {
        func: value => value.length >= 8,
        error: 'Mínimo 8 caracteres',
      },
      nospaces: true,
    },
    rterms: {
      required: true,
      validator: acceptCheckTerms(),
    },
  }

  const openNewTab = typeLink => {
    if (typeof window !== 'undefined') {
      window.open(urlSite[typeLink], '_blank')
    }
  }

  const onFormRegister = ({ remail, rpass }) => {
    if (typeof window !== 'undefined') {
      Taggeo(nameTagCategory, 'web_swl_registro_boton_registrarme')
      setLoading(true)
      setLoadText('Registrando...')
      window.Identity.signUp(
        {
          userName: remail,
          credentials: rpass,
          grantType: 'password',
        },
        {
          displayName: remail,
          email: remail,
          attributes: [
            {
              name: 'originDomain',
              value: window.location.hostname || 'none',
              type: 'String',
            },
            {
              name: 'originReferer',
              value: window.location.href || 'none',
              type: 'String',
            },
            {
              name: 'originMethod',
              value: '1',
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
        },
        { doLogin: true },
        { rememberMe: true }
      )
        .then(resSignUp => {
          setShowConfirm(true)

          setLoadText('Cargando Perfil...')
          window.Identity.getUserProfile().then(resProfile => {
            setLoadText('Cargando Servicios...')
            sendNewsLettersUser(
              urls.newsLetters,
              resProfile.uuid,
              resProfile.email,
              arcSite,
              resSignUp.accessToken || window.Identity.userIdentity.accessToken,
              ['general']
            )
              .then(() => {
                // activateAuth(resProfile)
                // updateStep(2)
                window.localStorage.removeItem('ArcId.USER_INFO')
                window.localStorage.removeItem('ArcId.USER_PROFILE')
                window.Identity.userProfile = null
                window.Identity.userIdentity = {}
              })
              .finally(() => {
                Taggeo(nameTagCategory, 'web_swl_registro_success_registrarme')
              })
          })
        })
        .catch(err => {
          setMsgError(getCodeError(err.code))
          setForgotLink(err.code === '300039')
          setLoading(false)
          Taggeo(nameTagCategory, 'web_swl_registro_error_registrarme')
        })
    }
  }

  const {
    values: { remail, rpass },
    errors: { remail: remailError, rpass: rpassError, rterms: rtermsError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFormRegister)

  const handleChangeInput = e => {
    handleOnChange(e)
    setMsgError(false)
  }

  const toogleHidePass = () => {
    if (showHidePass === 'password') setShowHidePass('text')
    else setShowHidePass('password')
  }

  const sendVerifyEmail = () => {
    setShowSendEmail(true)
    window.Identity.requestVerifyEmail(remail)
    Taggeo(nameTagCategory, 'web_swl_registro_reenviar_correo')
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
    <NavigateConsumer>
      {value => (
        <>
          {!showConfirm ? (
            <>
              <h2 className={styles.title}>{texts.register}</h2>
              <div
                className={`${styles.blockMiddle} ${isFbBrowser() &&
                  styles.blockFull}`}>
                <ButtonSocial
                  arcSocial="facebook"
                  arcSite={arcSite}
                  arcType="registro"
                />
                {!isFbBrowser() && (
                  <ButtonSocial
                    arcSocial="google"
                    arcSite={arcSite}
                    arcType="registro"
                  />
                )}
              </div>

              <div className={styles.titleLine}>
                <p className="large">{texts.orEnterDates}</p>
              </div>

              {msgError && (
                <div className={styles.block}>
                  <div className="msg-alert">
                    {` ${msgError} `}
                    {forgotLink && (
                      <>
                        <button
                          className={styles.link}
                          type="button"
                          onClick={() => value.changeTemplate('forgot')}>
                          Recuperar contraseña
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleOnSubmit} className="form-register">
                <div className={styles.block}>
                  <label htmlFor="remail">
                    Correo electrónico
                    <input
                      className={remailError && 'input-error'}
                      type="email"
                      name="remail"
                      value={remail}
                      required
                      onChange={handleChangeInput}
                      onBlur={handleOnChange}
                      disabled={loading}
                    />
                    {remailError && (
                      <span className="msn-error">{remailError}</span>
                    )}
                  </label>
                </div>

                <div className={styles.block}>
                  <label htmlFor="rpass">
                    Contraseña
                    <input
                      className={rpassError && 'input-error'}
                      type={showHidePass}
                      name="rpass"
                      value={rpass}
                      required
                      onChange={handleChangeInput}
                      onBlur={handleOnChange}
                      disabled={loading}
                    />
                    <button
                      name="lshowpass"
                      aria-label="lshowpass"
                      className={`${styles.btnShow}-${showHidePass}`}
                      type="button"
                      onClick={toogleHidePass}></button>
                    {rpassError && (
                      <span className="msn-error">{rpassError}</span>
                    )}
                  </label>
                </div>

                <div className={styles.block}>
                  <label htmlFor="rterms" className="terms">
                    <input
                      id="rterms"
                      value={checkedTerms ? 'si' : 'no'}
                      type="checkbox"
                      name="rterms"
                      disabled={loading}
                      required
                      onChange={e => {
                        handleOnChange(e)
                        setCheckedTerms(!checkedTerms)
                      }}
                    />
                    {texts.accept}
                    <button
                      className={styles.link}
                      type="button"
                      onClick={() => openNewTab('terminosSign')}>
                      {texts.terms}
                    </button>
                    {texts.and}
                    <button
                      className={styles.link}
                      type="button"
                      onClick={() => openNewTab('politicasSign')}>
                      {texts.policies}
                    </button>
                    <span
                      className={`checkmark ${rtermsError &&
                        'input-error'}`}></span>
                  </label>
                </div>

                {rtermsError && (
                  <div className={styles.block}>
                    <div className="msg-alert">{rtermsError}</div>
                  </div>
                )}

                <div className={styles.block}>
                  <button
                    className={`${styles.btn} ${loading && 'btn-loading'}`}
                    type="submit"
                    disabled={disable || loading}>
                    {loading ? loadText : 'Registrarme'}
                  </button>
                </div>
              </form>
              <p className={styles.backLogin}>
                {texts.hasAccount}
                <button
                  className={styles.link}
                  type="button"
                  onClick={() => {
                    value.changeTemplate('login')
                    Taggeo(nameTagCategory, 'web_swl_registro_link_volver')
                  }}>
                  Iniciar Sesión
                </button>
              </p>
            </>
          ) : (
            <div className={styles.center}>
              <MsgRegister bgcolor="#fff" style={{ marginBottom: '20px' }} />
              <h2 className={styles.title}>{texts.registerSuccess}</h2>

              <span className={styles.textBlock}>{remail}</span>

              <h3 className={styles.subTitle}>{texts.checkInbox}</h3>

              <div className={styles.block}>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={() => {
                    value.changeTemplate('login', remail)
                  }}>
                  Continuar
                </button>
              </div>

              <p className={styles.backLogin}>
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
            </div>
          )}
        </>
      )}
    </NavigateConsumer>
  )
}

Register.propTypes = {
  arcSite: PropTypes.string.isRequired,
}

export default Register
