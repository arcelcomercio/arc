import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import Terms from './_children/terminosTrome'
import { rankingTrome } from './_dependencies/data-ranking-trome'
import { Attribute, Profile } from './_utils/types'

const classes = {
  content: 'content-ranking-trome',
  container: 'content-ranking-trome__container-title',
  title: 'content-ranking-trome__title',
  instructions: 'content-ranking-trome__instructions',
  wrapper: 'content-ranking-trome__wrapper-cards',
  form: 'content-ranking-trome__form',
  card: 'content-ranking-trome__card',
  cardHead: 'content-ranking-trome__card-head',
  image: 'content-ranking-trome__image',
  cardBody: 'content-ranking-trome__card-body',
  list: 'content-ranking-trome__list',
  wrapperItem: 'content-ranking-trome__wrapper-item',
  item: 'content-ranking-trome__item',
  designAdjust: 'content-ranking-trome__item__adjust-p',
  itemArrow: 'content-ranking-trome__item-arrow',
  wrapperItemImg: 'content-ranking-trome__wrapper-item-img',
  itemImg: 'content-ranking-trome__item-img',
  containerButton: 'content-ranking-trome__container-button',
  button: 'content-ranking-trome__button',
  error: 'content-ranking-trome__error',

  modal: 'content-ranking-trome__modal',
  wrapperModal: 'content-ranking-trome__wrapper-modal',
  buttonModal: 'content-ranking-trome__modal-button',
  wrapperImage: 'content-ranking-trome__wrapper-img',
}

const uri = 'https://cdna.trome.pe/resources/dist/trome/ranking-trome'
interface Props {
  customFields?: {
    serviceEndPoint?: string
  }
}
interface UserProfile {
  user_uuid: string
  user_name: string
  user_lastn: string
  user_type_doc: string
  user_dni: string
  user_email: string
  user_birthday: string
  user_phone: string
}
const ContentRankingTrome = (props: Props) => {
  const { customFields } = props
  const {
    serviceEndPoint = 'http://pre.md.minoticia.pe/portal_apis/ranking-trome/',
  } = customFields || {}

  const [isError, setIsError] = useState(false)
  const [isVoted, setIsVoted] = useState(false) // false
  const [isRedirectLink, setIsRedirectLink] = useState(false)
  const [message, setMessage] = useState('')
  const [isModal, setIsModal] = useState(false) // false
  const [result, setResult] = useState({})
  const [userProfile, setUserProfile] = useState<UserProfile>()

  const getUserAttributes = (type: string, attributes: Attribute[]) => {
    switch (type) {
      case 'type_doc': {
        const documentType = attributes.find(
          ({ name }) => name === 'documentType'
        )
        return documentType?.value || ''
      }

      case 'dni': {
        const documentNumber = attributes.find(
          ({ name }) => name === 'documentNumber'
        )
        return documentNumber?.value || ''
      }

      default:
        return ''
    }
  }
  const resetRadio = () => {
    for (let n = 0; n < rankingTrome.length; n++) {
      const { radio } = rankingTrome[n]

      const ele = document.getElementsByName(radio) as any
      for (let i = 0; i < ele.length; i++) {
        ele[i].checked = false
      }
    }
  }
  const getData = async () => {
    await new Promise((resolve) => {
      // se ejecuta un tiempo de espera por el localstorage
      setTimeout(() => {
        resolve(true)
      }, 100)
    })
    const rawProfile = window.localStorage.getItem('ArcId.USER_PROFILE')
    let localProfile: Profile | null | undefined = null
    if (rawProfile) {
      localProfile = JSON.parse(rawProfile)
    }
    if (localProfile?.uuid) {
      setMessage('')
      setIsError(false)

      const {
        uuid = '',
        firstName = '',
        lastName = '',
        attributes = [],
        email = '',
        birthDay = '',
        birthMonth = '',
        birthYear = '',
        contacts = [],
      } = localProfile
      setUserProfile({
        user_uuid: uuid || '',
        user_name: firstName || '',
        user_lastn: lastName || '',
        user_type_doc: getUserAttributes('type_doc', attributes),
        user_dni: getUserAttributes('dni', attributes),
        user_email: email || '',
        user_birthday: `${birthDay}-${birthMonth}-${birthYear}` || '',
        user_phone: contacts[0]?.phone || '',
      })
      const voteFetch = await fetch(
        `${serviceEndPoint}?format=json&user_uuid=${uuid}`
      )
      const { results = [] } = await voteFetch.json()
      if (results.length === 0) {
        setIsVoted(true)
      } else {
        resetRadio()
        setMessage('Usted ya votó.')
        setIsError(true)
      }
    } else {
      setMessage(
        '* Primero debe de registrarse o iniciar sesión antes de votar.'
      )
      setIsError(true)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSelect = (name: string, value: string) => {
    setResult({ ...result, [name]: value })
    if (isVoted) {
      setIsError(false)
    }
  }
  const validUserProfile = () => {
    let valid = false
    let messageProfile = ''

    if (userProfile?.user_uuid.length === 0) {
      messageProfile += ', Primero registrase para completar:'
      valid = true
    }
    if (userProfile?.user_dni.length === 0) {
      messageProfile += ', DNI'
      valid = true
    }
    if (userProfile?.user_email.length === 0) {
      messageProfile += ', Email'
      valid = true
    }
    if (userProfile?.user_name.length === 0) {
      messageProfile += ', Nombre'
      valid = true
    }
    if (userProfile?.user_phone.length === 0) {
      messageProfile += ', Teléfono'
      valid = true
    }

    if (valid) {
      setIsRedirectLink(true)
      setMessage(`* Debe de completar su:${messageProfile.slice(1)}.`)
    } else {
      setIsRedirectLink(false)
    }
    return valid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validUserProfile()) return setIsError(true)

    if (Object.keys(result).length !== rankingTrome.length) {
      setMessage('* Debes elegir un ganador en cada categoría para continuar')
      return setIsError(true)
    }

    const newObject = {
      ...result,
      ...userProfile,
    }

    const voteFetch = await fetch(serviceEndPoint, {
      method: 'POST',
      body: JSON.stringify(newObject),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const newVoteFetch = await voteFetch.json()

    if (newVoteFetch?.id >= 0) {
      setIsVoted(false)
      setIsModal(true)
      resetRadio()
      setResult({})
    } else {
      console.log(newVoteFetch)
    }

    return true
  }

  return (
    <>
      <div className={classes.content}>
        <div className={classes.container}>
          <h1 className={classes.title}>
            ¡Elige a los mejores talentos Trome del año!
          </h1>
          <p>
            Elige a los que más destacaron, queriendo o sin querer, en el año
            2021. Puedes ganarte uno de los tres televisores que sorteamos.
          </p>
          <div className={classes.instructions}>
            1. Dale clic al siguiente botón{' '}
            <a
              href="/signwall/?outputType=subscriptions&signwallOrganic=1"
              style={{
                padding: '6px 25px',
                textDecoration: 'none',
                display: 'inline-block',
                background: '#FFF',
                color: '#333',
                borderRadius: '5px',
                fontSize: '12px',
              }}>
              Registrate
            </a>{' '}
            para poder participar.
            <br />
            2. Una vez registrado, es OBLIGATORIO completar tu DNI y tu Teléfono
            de contacto{' '}
            <a
              href="/mi-perfil/?outputType=subscriptions"
              className="premios_depor__header__cont__contRight__button--after"
              style={{
                padding: '6px 25px',
                textDecoration: 'none',
                display: 'inline-block',
                background: '#FFF',
                color: '#333',
                borderRadius: '5px',
                fontSize: '12px',
              }}>
              AQUÍ
            </a>
            .
            <br />
            3. Vota eligiendo un nominado por CADA UNA de las categorías (solo
            puedes votar una vez).
          </div>
        </div>

        <div className={classes.wrapper}>
          <form onSubmit={handleSubmit}>
            <div className={classes.form}>
              {rankingTrome.map(
                ({
                  title,
                  radio,
                  persons,
                  path_img,
                  designAdjust,
                  gapTitle,
                  largeTitle,
                }) => (
                  <div className={classes.card} key={title}>
                    <div className={classes.cardHead}>
                      <img
                        src={uri + path_img}
                        alt={title}
                        className={classes.image}
                      />
                      <h3
                        style={{
                          marginLeft: gapTitle ? '45px' : '0',
                          ...(largeTitle && {
                            fontSize: '14px',
                            letterSpacing: '-0.42px',
                            marginLeft: '63px',
                          }),
                        }}>
                        {title}
                      </h3>
                    </div>
                    <div className={classes.cardBody}>
                      <ul className={classes.list}>
                        {persons.map(({ name, path_author }) => (
                          <div
                            key={name}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleSelect(radio, name)}
                            onKeyPress={() => handleSelect(radio, name)}>
                            <label>
                              <input
                                className={classes.itemArrow}
                                type="radio"
                                name={radio}
                                disabled={!isVoted}
                              />
                              <div className={classes.wrapperItem}>
                                <div
                                  className={`${classes.item} ${
                                    designAdjust ? classes.designAdjust : ''
                                  }`}>
                                  <p>{name}</p>
                                </div>
                                <div className={classes.wrapperItemImg}>
                                  <img
                                    src={uri + path_author}
                                    alt="imagen"
                                    className={classes.itemImg}
                                  />
                                </div>
                              </div>
                            </label>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className={classes.containerButton}>
              {isVoted && (
                <button type="submit" className={classes.button}>
                  ENVIAR
                </button>
              )}
              {isError && (
                <>
                  <p className={classes.error}>{message}</p>{' '}
                  {isRedirectLink && (
                    <a href="/mi-perfil/?outputType=subscriptions">aquí.</a>
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      {isModal && (
        <div className={classes.modal}>
          <div className={classes.wrapperModal}>
            <div className={classes.wrapperImage}>
              <img src={`${uri}/modal1.jpg`} alt="Gracias por su voto" />
              <a href="/" className={classes.buttonModal}>
                Ir a Trome.pe
              </a>
            </div>
          </div>
        </div>
      )}
      <Terms />
    </>
  )
}

ContentRankingTrome.label = 'Contenido ranking trome'

ContentRankingTrome.propTypes = {
  customFields: PropTypes.shape({
    serviceEndPoint: PropTypes.string.tag({
      name: 'URL del servicio',
      description:
        'Por defecto la URL es http://pre.md.minoticia.pe/portal_apis/ranking-trome/',
    }),
  }),
}

export default ContentRankingTrome
