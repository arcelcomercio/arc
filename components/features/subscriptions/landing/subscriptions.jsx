/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import useForm from '../_hooks/useForm'
import { sendAction, PixelActions } from '../../paywall/_dependencies/analitycs'
import stylesLanding from '../_styles/Landing'
import { PropertiesSite, PropertiesCommon } from '../_dependencies/Properties'
import { Landing } from '../../signwall/_children/landing/index'
import { CallOut } from '../../signwall/_children/callout/index'
import Cards from './_children/Cards'
import QueryString from '../../signwall/_dependencies/querystring'
import Taggeo from '../../signwall/_dependencies/taggeo'
import { getUserName, isLogged } from '../_dependencies/Session'
import { FooterLand } from '../_layouts/footer'
// import { createExternalScript } from '../_dependencies/Utils'
import scriptsLanding from '../_scripts/Landing'
import addScriptAsync from '../_dependencies/Async'

import { formatNames, formatPhone } from '../_dependencies/Errors'
import { pushCallOut } from '../_dependencies/Services'

const arcType = 'landing'
const LandingSubscriptions = () => {
  const {
    arcSite,
    globalContent: items = [],
    customFields: { bannerUniComercio = false, bannerUniGestion = false } = {},
  } = useFusionContext() || {}

  const { urls, texts, benefist = [] } = PropertiesSite[arcSite]
  const { links } = PropertiesCommon
  const isComercio = arcSite === 'elcomercio'
  const [showSignwall, setShowSignwall] = useState(false)
  const [showTypeLanding, setShowTypeLanding] = useState('landing')
  const [showProfile, setShowProfile] = useState(false)
  const bannerUniv =
    (bannerUniComercio && isComercio) || (bannerUniGestion && !isComercio)

  const [showCallin, setShowCallin] = useState(false)
  const [showConfirmCall, setShowConfirmCall] = useState(false)
  const [showRepeatCall, setShowRepeatCall] = useState(false)
  const [showModalCall, setShowModalCall] = useState(false)
  const [showErrorCall, setShowErrorCall] = useState(false)

  const stateSchema = {
    namecall: { value: '', error: '' },
    phonecall: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    namecall: {
      required: true,
      validator: formatNames(),
    },
    phonecall: {
      required: true,
      validator: formatPhone(),
    },
  }

  useEffect(() => {
    addScriptAsync({
      name: 'IdentitySDK',
      url: links.identity,
      includeNoScript: false,
    }).then(() => {
      if (typeof window !== 'undefined') {
        window.Identity.options({ apiOrigin: urls.arcOrigin })
      }
    })

    sendAction(PixelActions.PRODUCT_IMPRESSION, {
      ecommerce: {
        currencyCode: items[0].price.currencyCode,
        impressions: items.map(item => ({
          name: item.title,
          id: item.sku,
          price: item.price.amount,
          brand: arcSite,
          category: 'Suscripcion',
        })),
      },
    })

    // createExternalScript(scriptsLanding, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUniversity = () => {
    Taggeo('Web_Sign_Wall_Students', 'web_link_ingresar_cuenta')
    setShowTypeLanding('students')
    setShowSignwall(!showSignwall)
  }

  const handleSignwall = () => {
    if (typeof window !== 'undefined') {
      Taggeo(
        'Web_Sign_Wall_Suscripciones',
        `web_link_ingresar_${isLogged() ? 'perfil' : 'cuenta'}`
      )
      if (isLogged()) {
        window.location.href = links.profile
      } else {
        setShowSignwall(!showSignwall)
        document.getElementById('btn-signwall').innerHTML = 'Inicia sesión'
        window.Identity.clearSession()
      }
    }
  }

  const handleAfterLogged = () => {
    if (typeof window !== 'undefined') {
      const { firstName, lastName } = window.Identity.userProfile || {}
      const newName = getUserName(firstName, lastName)
      setShowProfile(newName)
    }
  }

  const handleCallIn = () => {
    if (typeof window !== 'undefined') {
      window.document.location.href = 'tel:013115100'
    }
  }

  const onFomrCallOut = ({ namecall, phonecall }) => {
    pushCallOut(namecall, phonecall)
      .then(resCall => {
        if (
          resCall.resultado ||
          resCall.mensaje ===
            'El numero de telefono ya ha sido registrado el dia de hoy'
        ) {
          if (
            resCall.mensaje ===
            'El numero de telefono ya ha sido registrado el dia de hoy'
          ) {
            setShowRepeatCall(resCall.mensaje)
          } else {
            setShowConfirmCall(true)
          }
        } else {
          setShowErrorCall(resCall.mensaje || resCall.Message)
        }
      })
      .catch(() => {
        setShowErrorCall(
          'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.'
        )
      })
  }

  const {
    values: { namecall, phonecall },
    errors: { namecall: namecallError, phonecall: phonecallError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFomrCallOut)

  const handleChangeInput = e => {
    handleOnChange(e)
  }

  const handleShowCallOut = () => {
    setShowModalCall(true)
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{ __html: stylesLanding[arcSite] }}></style>
      <>
        <header className="header" id="header">
          <div className="wrapper">
            <div className={`header__content ${!isComercio ? 'box-cont' : ''}`}>
              <a
                href={urls.mainHome}
                target="_blank"
                rel="noreferrer"
                className="header__content-link"
                aria-label={arcSite}>
                <div className="header__content-logo"></div>
              </a>

              {isComercio && (
                <div className="header__content-call">
                  <span>Llama Gratis</span>
                  <button
                    type="button"
                    className="icon-phone"
                    onClick={handleCallIn}>
                    01 311 5100
                  </button>
                  <button
                    type="button"
                    className="icon-support"
                    onClick={() => setShowCallin(!showCallin)}>
                    Te Llamamos
                  </button>
                </div>
              )}

              <button
                className="header__content-button"
                type="button"
                id="btn-signwall"
                onClick={handleSignwall}>
                {showProfile || 'Inicia sesión'}
              </button>
            </div>
          </div>
        </header>

        {isComercio && showCallin && (
          <section id="callin" className="callin">
            <div className="wrapper">
              {showConfirmCall || showErrorCall || showRepeatCall ? (
                <div className="msg-confirmation">
                  {showConfirmCall && (
                    <h3>Tus datos han sido enviados correctamente</h3>
                  )}

                  {showRepeatCall && <h3>{showRepeatCall} </h3>}

                  {showErrorCall && <h3>Ocurrió un error</h3>}

                  {(showConfirmCall || showRepeatCall) && (
                    <>
                      <p>
                        Uno de nuestros ejecutivos se pondrá en contacto
                        contigo.
                      </p>
                      <p className="note-schedule">
                        Horario de atención es de L-V: 9AM a 8PM y S: 9AM a 1PM
                      </p>
                    </>
                  )}
                  {showErrorCall && <p>{showErrorCall}</p>}
                </div>
              ) : (
                <form onSubmit={handleOnSubmit}>
                  <input
                    className={namecallError && 'input-error'}
                    type="text"
                    placeholder="Nombre"
                    name="namecall"
                    maxLength="80"
                    required
                    value={namecall}
                    onBlur={handleOnChange}
                    onChange={handleChangeInput}
                  />
                  <input
                    className={phonecallError && 'input-error'}
                    type="text"
                    placeholder="Celular"
                    name="phonecall"
                    maxLength="9"
                    required
                    value={phonecall}
                    onBlur={handleOnChange}
                    onChange={handleChangeInput}
                  />
                  <button
                    type="submit"
                    className="icon-send"
                    disabled={disable}>
                    &nbsp;
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        <section className="planes">
          <div className={isComercio ? 'wrapper' : 'wrapper-full'}>
            {!isComercio && (
              <>
                <h1 className="planes__title">{texts.mainTop}</h1>
                <p className="planes__description">
                  {texts.parrafOne} <br />
                  {texts.parrafTwo}
                </p>
              </>
            )}

            <div className={isComercio ? 'planes__grid' : 'planes__grid-three'}>
              {items.map((item, order) => (
                <Cards
                  key={`card-${order + 1}`}
                  item={item}
                  order={order}
                  arcSite={arcSite}
                  textOffer={texts.offer}
                />
              ))}

              {isComercio && (
                <article className="planes__item planes__banner grid-four-four">
                  <div className="planes__content">
                    <i className="planes__banner-icon"></i>
                    <h3 className="planes__banner-title">
                      {texts.bannerTitle}
                    </h3>
                    <p className="planes__banner-description">
                      {texts.bannerText}
                    </p>
                    <button
                      type="button"
                      className="planes__banner-button"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.open(urls.subsPrint, '_blank')
                        }
                      }}>
                      {texts.bannerButton}
                    </button>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        <section className="banners">
          <div className={isComercio ? 'wrapper' : 'wrapper-medium'}>
            <div
              className={`banners__grid ${!bannerUniv && 'banners__grid-one'}`}>
              {bannerUniv && (
                <article
                  className="banners__item grid-two-one"
                  role="presentation"
                  onClick={handleUniversity}>
                  <div className="banners__content">
                    <h4 className="banners__content-title">
                      {texts.uniTitle}
                      <small>{texts.bannerNew}</small>
                    </h4>
                    <p className="banners__content-description">
                      {texts.uniDescription}
                    </p>
                  </div>
                </article>
              )}

              <article
                className={`banners__item ${
                  bannerUniv ? 'grid-two-two' : 'banners__item-one'
                }`}
                role="presentation"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.open(links.bannerCorp, '_blank')
                  }
                }}>
                <div className="banners__content">
                  <h4 className="banners__content-title">
                    {texts.corporativeTitle}
                  </h4>
                  <p className="banners__content-description">
                    {texts.corporativeDescrip}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="beneficios" id="beneficios">
          <div className="wrapper">
            <div className="beneficios__content">
              <h1 className="beneficios__content-title">
                Beneficios
                <div className="beneficios__content-logo"></div>
              </h1>
              <div className="beneficios__content-wrap">
                <div className="tabs">
                  {benefist.map((item, i) => {
                    return (
                      <div key={`benfist-${i + 1}`}>
                        <input
                          type="radio"
                          name="tabs"
                          defaultChecked={i + 1 === 1}
                          className="tab"
                          id={`tab--${i + 1}`}
                          onChange={() => {}}
                        />
                        <label
                          className="button"
                          htmlFor={`tab--${i + 1}`}
                          id={`button--${i + 1}`}>
                          {item.title}
                        </label>
                        <div className="display" id={`display--${i + 1}`}>
                          <div className="picture-mobile">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <h2 className="title-mobile">{item.title}</h2>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="beneficios__content-slides">
                {benefist.map((item, i) => {
                  return (
                    <img
                      key={`image-${i + 1}`}
                      className="picture"
                      id={`picture--tab--${i + 1}`}
                      src={item.image}
                      alt={item.title}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="club" id="club">
          <div className="wrapper">
            <div className="club__content">
              <img
                className="logo-club"
                src="https://suscripciones.elcomercio.pe/static/partners/comercio/img/logo_club.png?v137"
                alt="Logo Club"
              />

              <h3 className="title-club">
                El programa de beneficios para los suscriptores <br /> de las
                ediciones impresas y digitales que te ofrece:
              </h3>

              <div className="rows-club">
                <div className="row-club">
                  <i className="icon-descuento"></i>
                  <h4>Cientos de descuentos</h4>
                  <p>
                    En restaurantes, educación, hogar, entretenimiento y más.
                  </p>
                </div>
                <div className="row-club">
                  <i className="icon-limite"></i>
                  <h4>Las veces que quieras</h4>
                  <p>Utilízalos todas las veces que quieras, ¡no hay límite</p>
                </div>
                <div className="row-club">
                  <i className="icon-pago"></i>
                  <h4>Con cualquier medio de pago</h4>
                  <p>
                    Paga como prefieras, con cualquier tarjeta que acepte el
                    establecimiento o en efectivo.
                  </p>
                </div>
                <div className="row-club">
                  <i className="icon-compartir"></i>
                  <h4>Compártelo con alguien más</h4>
                  <p>
                    Registra a un invitado para que disfrute de todos los
                    beneficios del club.
                  </p>
                </div>
              </div>

              <div className="button-club">
                <button
                  type="button"
                  onClick={() => {
                    window.open(`${links.clubComercio}_${arcSite}`, '_blank')
                  }}>
                  Ver más en <span>clubelcomercio.pe</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {isComercio && (
          <section className="video">
            <div className="wrapper">
              <div className="video__content">
                <h1 className="video__content-title">{texts.videoTitle}</h1>
                <p className="video__content-subtitle">
                  {texts.videoSubstitle}
                </p>
                <p className="video__content-descripction">
                  {texts.videoDescription}
                </p>
                <video
                  id="video"
                  className="video__content-video"
                  muted
                  controls="1"
                  poster="https://cdna.elcomercio.pe/resources/dist/elcomercio/images/landing/fondo_video.jpg"
                  src="https://pub.minoticia.pe/elcomercio/el_comercio.mp4"></video>
              </div>
            </div>
          </section>
        )}

        <section className="ayuda">
          <div className="wrapper">
            <div className="ayuda__content">
              <h1 className="ayuda__content-title">
                {texts.helpTitle}
                <br />
                {texts.helpSubstitle}
              </h1>
              <p className="ayuda__content-description">
                {`${texts.helpDescription} `}
                <a target="_blank" rel="noreferrer" href={links.preguntas}>
                  Preguntas Frecuentes
                </a>
              </p>
            </div>
          </div>
        </section>

        <FooterLand {...{ arcType }} />

        {isComercio && (
          <section className="callin-movil">
            <button type="button" className="icon-phone" onClick={handleCallIn}>
              01 311 5100
            </button>
            <button
              type="button"
              className="icon-support"
              onClick={handleShowCallOut}>
              Te Llamamos
            </button>
          </section>
        )}

        {(QueryString.getQuery('signLanding') ||
          QueryString.getQuery('signStudents') ||
          showSignwall) && (
          <Landing
            typeDialog={showTypeLanding}
            nameDialog={showTypeLanding}
            onLogged={handleAfterLogged}
            onLoggedFail={() => {}}
            onClose={() => {
              setShowSignwall(false)
              setShowTypeLanding('landing')
            }}
          />
        )}

        {showModalCall && (
          <CallOut
            typeDialog={showTypeLanding}
            nameDialog={showTypeLanding}
            onLoggedFail={() => {}}
            onClose={() => {
              setShowModalCall(false)
            }}
          />
        )}
      </>

      <script
        type="text/javascript"
        src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: scriptsLanding,
        }}
      />
    </>
  )
}

LandingSubscriptions.propTypes = {
  customFields: PropTypes.shape({
    bannerUniComercio: PropTypes.bool.tag({
      name: 'Banner Univ. El Comercio',
      defaultValue: false,
      description: 'Mostrar/Ocultar Banner Universitario El Comercio.',
    }),
    bannerUniGestion: PropTypes.bool.tag({
      name: 'Banner Univ. Gestión',
      defaultValue: false,
      description: 'Mostrar/Ocultar Banner Universitario Gestíon.',
    }),
  }),
}

export default LandingSubscriptions
