import * as React from 'react'
import { FC } from 'types/features'

const PollaRankingWithPagintation: FC = () => {
  console.log('TODO')

  return (
    <>
      <img
        className="polla-ranking__rank-img"
        src="https://tl.vhv.rs/dpng/s/407-4077902_no-1-logo-png-h-with-laurel-wreath.png"
        alt="Trofeo con laureles"
      />
      <div className="polla-ranking__table">
        <h2 className="polla-ranking__table-title">Ranking</h2>
        {Array.from(Array(10).keys()).map((_, i) => (
          <div className="polla-ranking__table-item">
            <div className="polla-ranking__table-first">{i + 1}.</div>
            <div className="polla-ranking__table-second">Alessandra Quispe</div>
            <div className="polla-ranking__table-third">30</div>
          </div>
        ))}
      </div>
      <div className="polla-ranking__pag">
        <button type="button" className="polla-ranking__pag-arr">
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 1.07273L5.9323 0L0 6L5.9383 12L7 10.9273L2.12339 6L7 1.07273V1.07273Z"
              fill="#2C78FF"
            />
          </svg>
          <span>Anterior</span>
        </button>

        <div className="polla-ranking__pag-numbers">
          <button className="active" type="button">
            1
          </button>
          <button type="button">2</button>
          <button type="button">3</button>
        </div>

        <button type="button" className="polla-ranking__pag-arr">
          <span>Siguiente</span>
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.752442 11.7774L1.82014 12.8501L7.75244 6.8501L1.81414 0.850097L0.752443 1.92282L5.62905 6.8501L0.752442 11.7774V11.7774Z"
              fill="#2C78FF"
            />
          </svg>
        </button>
      </div>
    </>
  )
}

PollaRankingWithPagintation.label = 'La Polla - Ranking con paginación'

export default PollaRankingWithPagintation
