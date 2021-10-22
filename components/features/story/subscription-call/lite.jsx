import React from 'react'

const placeholderSrc = (width, height) =>
  `data:image/svg+xml,%3Csvg  viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`

function StorySubsriptionCall() {
  return (
    <div className="story-subs-call">
      <div className="story-subs-call__cont f f-center">
        <img
          className="story-subs-call__ph lazy"
          data-src="https://cdna.elcomercio.pe/resources/dist/elcomercio/images/phone-subs-ec_720.png?d=1"
          src={placeholderSrc(470, 719)}
          alt="EC suscripciones"
        />

        <div>
          <img
            className="story-subs-call__logo lazy"
            data-src="https://cdna.elcomercio.pe/resources/dist/elcomercio/images/logo.png?d=1"
            src={placeholderSrc(321, 51)}
            alt="Logo EC"
          />
          <div className="story-subs-call__t1">
            Periodismo independiente y veraz, todos los días.
          </div>
          <div className="story-subs-call__t2">
            Suscríbete desde S/ 5 por el primer mes
          </div>
          <div className="story-subs-call__t3">Plan Digital</div>
          <a
            className="story-subs-call__link f f-center"
            href="/suscripciones/">
            VER OFERTAS
          </a>
        </div>
      </div>
    </div>
  )
}

StorySubsriptionCall.static = true
StorySubsriptionCall.label = 'Artículo - Llamada a suscripción'

export default StorySubsriptionCall
