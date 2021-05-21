import * as React from 'react'
import { FC } from 'types/features'

interface Props {
  customFields?: any
}

const PollaHomepage: FC<Props> = () => {
  console.log('/////')

  return (
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
  )
}

PollaHomepage.label = 'La Polla - Homepage Landing'

export default PollaHomepage
