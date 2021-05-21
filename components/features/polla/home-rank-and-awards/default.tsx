import * as React from 'react'
import { FC } from 'types/features'

interface Props {
  customFields?: any
}

const PollaHomepage: FC<Props> = () => {
  console.log('/////')

  return (
    <>
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
      <div className="polla-home__aw">
        <h2 className="polla-home__aw-title">
          ¡Estos son algunos de los premios!
        </h2>
        <div>Aqui va el HTML</div>
        <a href="/" className="polla-home__aw-link">
          VER MÁS
        </a>
      </div>
    </>
  )
}

PollaHomepage.label = 'La Polla - Homepage Ranking y Premios'

export default PollaHomepage
