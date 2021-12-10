import React, { useState } from 'react'

import { premiosDepor } from './_dependencies/data-premios-depor'
// import { TerminosPremiosDepor } from './children/terminos'

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
}

const uri = 'https://cdna.depor.com/resources/dist/depor/premios-depor'

const ContentPremiosDepor = () => {
  const [error, setError] = useState(false)
  const [result, setResult] = useState({})

  const handleSelect = (name: string, value: string) => {
    setResult({ ...result, [name]: value })
    setError(false)
  }

  const handleEnviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.keys(result).length !== premiosDepor.length)
      return setError(true)

    // console.log(result)
    return null
  }

  return (
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
        <form onSubmit={handleEnviar}>
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
                              />
                              {!name ? (
                                <span className={classes.item}>{person}</span>
                              ) : (
                                <p className={classes.item}>
                                  {name} <span>{profesion}</span>{' '}
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
            <button type="submit" className={classes.button}>
              ENVIAR
            </button>
            {error && (
              <p className={classes.error}>
                * Debes elegir un ganador en cada categoría para continuar
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

ContentPremiosDepor.label = 'Contenido premios depor'

export default ContentPremiosDepor
