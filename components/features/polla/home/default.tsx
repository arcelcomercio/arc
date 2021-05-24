import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

interface Props {
  customFields: {
    block: 'landing' | 'ranking' | 'awards'
  }
}

const PollaHomepage: FC<unknown> = (props) => {
  const { customFields } = props as Props

  return (
    <>
      {customFields?.block === 'landing' && (
        <>
          <div className="polla-home__logo-container">
            <img
              className="polla-home__logo-img"
              src="https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_general/depor/prod/polla-peru-vs-argentina-nndd-xvisual/img/polla-depor.png"
              alt="Logo La Polla"
            />
            <h1 className="polla-home__logo-title">Copa América 2021</h1>
            <div className="polla-home__brand-container">
              <span>Aspicia: </span>
              <img
                src="https://images.virtualsoft.tech/site/doradobet/logo-horizontalv2.png"
                alt="Brand"
              />
            </div>
          </div>
          <div className="polla-home__desc-container">
            <div>
              <h2 className="polla-home__desc-title">
                ¡Juega la Polla Depor y gana increíbles premios!
              </h2>
              <p className="polla-home__desc-parag">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </p>
              <a href="/" className="polla-home__desc-link">
                ¡JUEGA!
              </a>
            </div>
            <img
              className="polla-home__desc-img"
              src="https://img.freepik.com/free-photo/excellent-goal-three-soccer-fans-woman-and-men-cheering-for-favorite-sport-team-with-bright-emotions-isolated-on-white-studio-background_155003-24247.jpg?size=664&ext=jpg"
              alt="Imagen de interacción"
            />
          </div>
        </>
      )}
      {customFields?.block === 'ranking' && (
        <div className="polla-home__rank-container">
          <img
            className="polla-home__rank-img"
            src="https://tl.vhv.rs/dpng/s/407-4077902_no-1-logo-png-h-with-laurel-wreath.png"
            alt="Trofeo"
          />
          <div className="polla-home__rank-table">
            <h3 className="polla-home__rank-title">RANKING</h3>
            {Array.from(Array(10).keys()).map((_, i) => (
              <div className="polla-home__rank-item">
                <div className="polla-home__rank-first">{i + 1}.</div>
                <div className="polla-home__rank-second">Alessandra Quispe</div>
                <div className="polla-home__rank-third">30</div>
              </div>
            ))}
            <a className="polla-home__rank-link" href="/">
              VER TABLA COMPLETA
            </a>
          </div>
        </div>
      )}
      {customFields?.block === 'awards' && (
        <div className="polla-home__aw">
          <h2 className="polla-home__aw-title">
            ¡Estos son algunos de los premios!
          </h2>
          <div>Aqui va el HTML</div>
          <a href="/" className="polla-home__aw-link">
            VER MÁS
          </a>
        </div>
      )}
    </>
  )
}

PollaHomepage.label = 'La Polla - Homepage'

PollaHomepage.propTypes = {
  customFields: PropTypes.shape({
    block: PropTypes.oneOf(['landing', 'ranking', 'awards']).tag({
      name: 'Bloque',
      labels: {
        landing: 'Landing',
        ranking: 'Ranking',
        awards: 'Premios',
      },
      defaultValue: 'landing',
    }),
  }),
}

export default PollaHomepage
