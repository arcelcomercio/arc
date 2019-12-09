import React from 'react'

const StoryContinue = () => {
  return (
    <a href="/" className="sty-continue">
      <div className="sty-continue__left">
        <div className="sty-continue__logo">
          <span className="sty-continue__img">C</span>
        </div>
        <div role="progressbar" className="sty-continue__progress" />
      </div>
      <div className="sty-continue__right">
        <span className="sty-continue__subtitle">Cargando siguiente...</span>
        <h3 className="sty-continue__title">
          Martín Vizcarra a empresarios en CADE: “No podemos mercantilizar la
          política”
        </h3>
      </div>
    </a>
  )
}

export default StoryContinue
