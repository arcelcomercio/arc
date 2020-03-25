import React from 'react'

const StoryContinueLite = () => {
  return (
    <a href="/" className="st-continue">
      <div className="st-continue__left">
        <div className="st-continue__logo">
          <span className="st-continue__img">C</span>
        </div>
        <div role="progressbar" className="st-continue__progress" />
      </div>
      <div className="st-continue__right">
        <span className="st-continue__subtitle">Cargando siguiente...</span>
        <h3 className="st-continue__title">
          Martín Vizcarra a empresarios en CADE: “No podemos mercantilizar la
          política”
        </h3>
      </div>
    </a>
  )
}

export default StoryContinueLite
