import React, { useState, useContext } from 'react'
import { NavigateConsumer } from '../../../../_context/navigate'
import useForm from '../../../../_hooks/useForm'
import { AuthContext } from '../../../../_context/auth'
import getDevice from '../../../../_dependencies/GetDevice'
import PropertiesSite from '../../../../_dependencies/Properties'
import { sendNewsLettersUser } from '../../../../_dependencies/Services'
import ButtonSocial from './social'
import { Taggeo } from '../../../../_dependencies/Taggeo'
import getCodeError, {
  formatEmail,
  acceptCheckTerms,
} from '../../../../_dependencies/Errors'

const styles = {
  title: 'step__left-title',
  blockMiddle: 'step__left-block-middle',
  titleLine: 'step__left-title-line',
  block: 'step__left-block',
  btn: 'step__left-btn-next',
  link: 'step__btn-link',
  backLogin: 'step__left-link-register',
}

const nameTagCategory = 'Web_Sign_Wall_Landing'

const Register = ({ arcSite, arcEnv, fromFia }) => {
  const { activateAuth, updateStep } = useContext(AuthContext)
  const [loading, setLoading] = useState()
  const [loadText, setLoadText] = useState('Cargando...')
  const [msgError, setMsgError] = useState()
  const [checkedTerms, setCheckedTerms] = useState()
  const [forgotLink, setForgotLink] = useState()
  const { texts, urls } = PropertiesSite.common
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
        .then(() => {
          setLoadText('Cargando Perfil...')
          window.Identity.getUserProfile().then(resProfile => {
            setLoadText('Cargando Servicios...')
            sendNewsLettersUser(
              urls.newsLetters[arcEnv],
              resProfile.uuid,
              resProfile.email,
              arcSite,
              window.Identity.userIdentity.accessToken,
              ['general']
            )
              .then(() => {
                activateAuth(resProfile)
                updateStep(2)
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

  return (
    <NavigateConsumer>
      {value => (
        <>
          <h2 className={styles.title}>{texts.register}</h2>
          <div
            className={`${styles.blockMiddle} ${fromFia && styles.blockFull}`}>
            <ButtonSocial
              arcSocial="facebook"
              arcSite={arcSite}
              arcEnv={arcEnv}
              arcType="registro"
            />
            {!fromFia && (
              <ButtonSocial
                arcSocial="google"
                arcSite={arcSite}
                arcEnv={arcEnv}
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
                  type="password"
                  name="rpass"
                  value={rpass}
                  required
                  onChange={handleChangeInput}
                  onBlur={handleOnChange}
                  disabled={loading}
                />
                {rpassError && <span className="msn-error">{rpassError}</span>}
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
      )}
    </NavigateConsumer>
  )
}

export default Register
