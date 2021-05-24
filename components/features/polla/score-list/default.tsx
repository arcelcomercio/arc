import * as React from 'react'
import { FC } from 'types/features'

const PollaScoreList: FC = () => {
  console.log('TODO')

  return (
    <>
      <div className="polla-score__current">
        <span className="polla-score__current-text">Tienes:</span>
        <div className="polla-score__current-wrap">
          <div className="polla-score__current-cont">
            <div className="polla-score__current-top">
              <span className="left">05</span>
              <span className="right">Puntos</span>
            </div>
            <div className="polla-score__current-bot">
              <span className="left">Ranking:</span>
              <span className="right">128</span>
            </div>
          </div>
        </div>
      </div>

      <div className="polla-score__nav">
        <button type="button" className="polla-score__nav-btn">
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 1.07273L5.9323 0L0 6L5.9383 12L7 10.9273L2.12339 6L7 1.07273V1.07273Z"
              fill="#FFFFFF"
            />
          </svg>
        </button>

        <div className="polla-score__nav-sel-cont">
          <div className="polla-score__nav-sel-p">
            <span className="bold">Jornada 1</span>
            <span>11 - 13 Jun.</span>
            <svg
              width="13"
              height="7"
              viewBox="0 0 13 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L6.5 7L13 0" fill="#DC532E" />
            </svg>
          </div>
          <select name="cars" id="cars" className="polla-score__nav-sel">
            <option value="volvo">Jornada 1 (11 - 13 Jun.)</option>
            <option value="saab">Jornada 2 (11 - 13 Jun.)</option>
            <option value="mercedes">Jornada 3 (11 - 13 Jun.)</option>
            <option value="audi">Jornada 4 (11 - 13 Jun.)</option>
          </select>
        </div>

        <button type="button" className="polla-score__nav-btn">
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.752442 11.7774L1.82014 12.8501L7.75244 6.8501L1.81414 0.850097L0.752443 1.92282L5.62905 6.8501L0.752442 11.7774V11.7774Z"
              fill="#FFFFFF"
            />
          </svg>
        </button>
      </div>
    </>
  )
}

PollaScoreList.label = 'La Polla - Listado de Scores'

export default PollaScoreList
