import React from 'react'

export default () => {
  return (
    <div className="section-video">
      <div className="section-video__top">
        <div className="section-video__left" />
        <div className="section-video__right">
          <div className="section-video__breadcrumbs">
            <a href="/">Video</a>
            <a href="/">Mundo</a>
          </div>
          <h1 className="section-video__title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur, incidunt fuga eos obcaecati vitae.
          </h1>
          <p className="section-video__subtitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
            voluptas nesciunt. Maxime rerum doloribus enim earum dignissimos ad
            dolore assumenda. Maiores fugiat voluptas doloribus excepturi, sit
            ducimus at minus delectus.
          </p>
          <p className="section-video__author">Foto y video (AFP)</p>
        </div>
      </div>
      <div className="section-video__bottom">
        <div className="section-video__share">
          <button type="button" className="btn btn-facebook">
            Compartir
          </button>
        </div>
        <div className="section-video__detail">
          <span>15 de Agosto de 2019</span>
          <span>13:25</span>
          <span>Duracion: 00:40</span>
        </div>
      </div>
    </div>
  )
}
