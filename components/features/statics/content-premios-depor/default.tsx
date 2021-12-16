import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import Terms from './_children/terminos'
import { premiosDepor } from './_dependencies/data-premios-depor'
import { Attribute, Profile } from './_utils/types'

const classes = {
  content: 'content-premios-depor',
  container: 'content-premios-depor__container-title',
  title: 'content-premios-depor__title',
  instructions: 'content-premios-depor__instructions',
  wrapper: 'content-premios-depor__wrapper-cards',
  form: 'content-premios-depor__form',
  card: 'content-premios-depor__card',
  cardHead: 'content-premios-depor__card-head',
  image: 'content-premios-depor__image',
  cardBody: 'content-premios-depor__card-body',
  list: 'content-premios-depor__list',
  item: 'content-premios-depor__item',
  itemArrow: 'content-premios-depor__item-arrow',
  containerButton: 'content-premios-depor__container-button',
  button: 'content-premios-depor__button',
  error: 'content-premios-depor__error',

  modal: 'content-premios-depor__modal',
  logoModal: 'content-premios-depor__logo',
  wrapperModal: 'content-premios-depor__wrapper-modal',
  titleModal: 'content-premios-depor__modal-title',
  play: 'content-premios-depor__play',
  buttonModal: 'content-premios-depor__modal-button',
  wrapperImage: 'content-premios-depor__wrapper-img',
}

const uri = 'https://cdna.depor.com/resources/dist/depor/premios-depor'
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

const ContentPremiosDepor = (props: Props) => {
  const { customFields } = props
  const {
    serviceEndPoint = 'http://pre.md.minoticia.pe/portal_apis/premios-depor/',
  } = customFields || {}

  const [isError, setIsError] = useState(false)
  const [isVoted, setIsVoted] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [isRedirectLink, setIsRedirectLink] = useState(false)
  const [message, setMessage] = useState('')
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
    for (let n = 0; n < premiosDepor.length; n++) {
      const { radio } = premiosDepor[n]

      const ele = document.getElementsByName(radio) as any
      for (let i = 0; i < ele.length; i++) {
        ele[i].checked = false
      }
    }
  }

  const getData = async () => {
    const rawProfile = window.localStorage.getItem('ArcId.USER_PROFILE')
    let localProfile: Profile | null | undefined = null
    if (rawProfile) {
      localProfile = JSON.parse(rawProfile)
    }
    if (localProfile?.uuid) {
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
      document.location.href =
        '/signwall/?outputType=subscriptions&signwallOrganic=1'
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
      setMessage(`Debe de completar su:${messageProfile.slice(1)}.`)
    } else {
      setIsRedirectLink(false)
    }
    return valid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validUserProfile()) return setIsError(true)

    if (Object.keys(result).length !== premiosDepor.length) {
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
      setIsModal(true)
      setIsVoted(false)
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
            ¡Premiamos a los mejores talentos Depor del año!
          </h1>
          <p>
            A continuación te presentamos once categorías en donde elegirás al
            deportista más destacado del 2021.
          </p>
          <div className={classes.instructions}>
            1. Debes elegir un deportista por CADA UNA de las categorías. (solo
            puedes votar una vez) <br />
            2. Debes completar tu DNI y Nro. de Teléfono de contacto de manera
            obligatoria.
          </div>
        </div>

        <div className={classes.wrapper}>
          <form onSubmit={handleSubmit}>
            <div className={classes.form}>
              {premiosDepor.map(
                ({ title, radio, persons, path_img, largeTitle }) => (
                  <div className={classes.card} key={title}>
                    <div className={classes.cardHead}>
                      <img
                        src={uri + path_img}
                        alt={title}
                        className={classes.image}
                      />
                      <h3 style={{ marginLeft: largeTitle ? '45px' : '0' }}>
                        {title}
                      </h3>
                    </div>
                    <div className={classes.cardBody}>
                      <ul className={classes.list}>
                        {persons.map((person) => {
                          let name
                          let profesion
                          if (person.indexOf('(') > 0) {
                            const index = person.indexOf('(')
                            name = person.slice(0, index)
                            profesion = person.slice(index)
                          }
                          return (
                            <div
                              key={person}
                              role="button"
                              tabIndex={0}
                              onClick={() => handleSelect(radio, person)}
                              onKeyPress={() => handleSelect(radio, person)}>
                              <label>
                                <input
                                  className={classes.itemArrow}
                                  type="radio"
                                  name={radio}
                                  disabled={!isVoted}
                                />
                                {!name ? (
                                  <span className={classes.item}>{person}</span>
                                ) : (
                                  <p className={classes.item}>
                                    {name} <span>{profesion}</span>
                                  </p>
                                )}
                              </label>
                            </div>
                          )
                        })}
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
                    <a href="https://depor.com/mi-perfil/?outputType=subscriptions">
                      aquí.
                    </a>
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
            <img
              src="https://cdna.depor.com/resources/dist/depor/premios-depor/Logo_Depor_green.svg"
              alt="voto"
              className={classes.logoModal}
            />
            <h1 className={classes.titleModal}>¡Gracias por tu voto!</h1>
            <p> Tu participación ha sido registrada para el sorteo de un </p>
            <h1 className={classes.play}> PlayStation 5 </h1>
            <div className={classes.wrapperImage}>
              <img
                src="https://cdna.depor.com/resources/dist/depor/premios-depor/ps5_controller.svg"
                alt="play"
              />
              <a href="/" className={classes.buttonModal}>
                Ir a Depor.com
              </a>
            </div>
          </div>
        </div>
      )}
      <Terms />
    </>
  )
}

ContentPremiosDepor.label = 'Contenido premios depor'

ContentPremiosDepor.propTypes = {
  customFields: PropTypes.shape({
    serviceEndPoint: PropTypes.string.tag({
      name: 'URL del servicio',
      description:
        'Por defecto la URL es http://pre.md.minoticia.pe/portal_apis/premios-depor/',
    }),
  }),
}

export default ContentPremiosDepor
