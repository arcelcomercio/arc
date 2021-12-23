import React from 'react'

const classes = {
  boxT: 'ranking_trome__terminosTrome__boxT',
  boxUnoT: 'ranking_trome__terminosTrome__boxT__boxUnoT',
  tromeColor: 'ranking_trome__terminosTrome__boxT__tromeColor',
  blackT: 'ranking_trome__terminosTrome__boxT__blackT',
  textT: 'ranking_trome__terminosTrome__boxT__blackT__textT',
  titleT: 'ranking_trome__terminosTrome__boxT__blackT__textT__tituloT',
  contentT: 'ranking_trome__terminosTrome__boxT__blackT__textT__contenidoT',
  linesT: 'ranking_trome__terminosTrome__boxT__blackT__linesT',
  linesMobTrome: 'ranking_trome__terminosTrome__boxT__blackT__linesMobTrome',
}

let isMobile
if (typeof window !== 'undefined')
  isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    window.navigator.userAgent
  )


const pathT = "https://cdna.trome.pe/resources/dist/trome/ranking-trome/svg/Lines_orange.svg"


const Terms = () => {

  return (
    <div className={classes.boxT}>
      <div className={`${classes.boxUnoT} ${classes.tromeColor}`} />
      <div className={classes.blackT}>
        <div className={classes.textT} id="termsid">
          <div className={classes.titleT}>Términos y Condiciones</div>
          <div className={classes.contentT}>
            <p>
              Para participar de la campaña <b>“RANKING TROME 2021”</b> a nivel
              nacional, el lector deberá ingresar a la página web https://trome.pe/
              en la cual podrá votar por los nominados más destacados en las
              siguientes categorías: serie o novela del año, ampay del año,
              la pedida de mano más sonada, la dieta más sonada de Susy Diaz,
              la bronca del año, el roche del año, la imitación de Lapadula,
              el cumbiambero del año, la conductora del año y la salsera del año.
            </p>
            <p>

              Serán 10 categorías en total y el lector deberá votar por aquel
              nominado que, a su criterio, mejor represente cada una de estas.
              Por persona registrada solo se permite votar una vez.
              Solo se permite un voto por cada categoría.
            </p>
            <p>
              Entre los lectores votantes de la campaña se sorteará tres Smart TV.
              Fecha del sorteo: lunes 03 de enero del 2022. El ganador será anunciado
              en un plazo máximo de siete días calendarios posteriores al sorteo,
              a través de una publicación en el Diario Trome versión Print.
              Así mismo, tendrá cinco días calendarios para reclamar el premio,
              contados desde la publicación. Posterior a ese plazo, el ganador perderá
              el derecho de reclamarlo.
            </p>
            <p>
              El lector podrá votar desde el 27 de diciembre hasta el 31 de diciembre
              del 2021 y los resultados finales serán publicados en el Print del diario
              Trome el 04 de enero de 2022.
            </p>
            <p>
              No participan canillas ni menores de 18 años.Los colaboradores de las
              empresas del Grupo El Comercio no pueden participar de la promoción.
              Al registrarse dentro de la web https://trome.pe/, usted manifiesta su
              conformidad a los términos y condiciones, así como la política de
              privacidad que figuran en{' '}
              <a href="https://trome.pe/terminosTrome-y-condiciones/">https://trome.pe/terminosTrome-y-condiciones</a>
              &nbsp;y{' '}
              <a href="https://trome.pe/politica-de-privacidad/">https://trome.pe/politica-de-privacidad/</a>.
            </p>
          </div>
        </div>
        {isMobile ? (
          <div className={classes.linesMobTrome} />
        ) : (
          <img
            src={pathT}
            className={classes.linesT}
            alt="orange lines"
          />
        )}
      </div>
    </div>
  )
}
export default Terms
