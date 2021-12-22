import React from 'react'

const classes = {
  box: 'premios_depor__terminos__box',
  boxUno: 'premios_depor__terminos__box__boxUno',
  deporColor: 'premios_depor__terminos__box__deporColor',
  tromeColor: 'premios_depor__terminos__box__tromeColor',
  black: 'premios_depor__terminos__box__black',
  text: 'premios_depor__terminos__box__black__text',
  title: 'premios_depor__terminos__box__black__text__titulo',
  content: 'premios_depor__terminos__box__black__text__contenido',
  lines: 'premios_depor__terminos__box__black__lines',
  linesMobDepor: 'premios_depor__terminos__box__black__linesMobDepor',
  linesMobTrome: 'premios_depor__terminos__box__black__linesMobTrome',
}

let isMobile
if (typeof window !== 'undefined')
  isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    window.navigator.userAgent
  )

const pathD = "https://cdna.depor.com/resources/dist/depor/premios-depor/green_lines.svg"
const pathT = "https://cdna.trome.pe/resources/dist/trome/ranking-trome/svg/Lines_orange.svg"


const Terms = (props) => {

  const { isRankingTrome = false } = props

  return (
    <div className={classes.box}>
      <div className={`${classes.boxUno} ${isRankingTrome ? classes.tromeColor : classes.deporColor}`} />
      <div className={classes.black}>
        <div className={classes.text} id="termsid">
          <div className={classes.title}>Términos y Condiciones</div>
          {isRankingTrome ? (
            <div className={classes.content}>
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
                {' '}
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
                privacidad que figuran en <span>https://trome.pe/terminos-y-condiciones</span> y&nbsp;
                <span>https://trome.pe/politica-de-privacidad/</span>.
              </p>
            </div>
          ) : (
            <div className={classes.content}>
              <p>
                Para participar de la campaña “<b>PREMIOS DEPOR 2021</b>” a nivel
                nacional, el lector deberá ingresar a la página web{' '}
                <a href="https://depor.com/premios-depor">
                  {' '}
                  https://depor.com/premios-depor
                </a>
                &nbsp; o escanear el código QR que se encuentra en las piezas
                publicitarias de la campaña.
              </p>
              <p>
                {' '}
                Luego de ello, el lector será redirigido a la web site de la campaña
                Premios Depor en la cual podrá votar por los/las deportistas más
                destacados en las siguientes categorías: futbolista del año, jugador
                revelación, mejor técnico, mejor peruanos en el extranjero,
                futbolista femenina, voley, lucha, freestyle, surf, equipo de
                e-sports y deportista del año.
              </p>
              <p>
                Cada categoría tendrá 5 nominaciones y el lector deberá votar por
                aquel deportista que, a su criterio, mejor represente cada una de
                estas.
              </p>
              <p>Por persona registrada solo se permite votar una vez.</p>
              <p> Solo se permite un voto por cada categoría.</p>
              <p>
                {' '}
                Al deportista ganador de cada categoría se le hará entrega de un
                trofeo “Premios Depor 2021” correspondiente al rubro en el que haya
                destacado.
              </p>

              <p>
                Entre los lectores votantes de la campaña se sorteará una
                Playstation 5. Fecha del sorteo: Lunes 03 de enero del 2022. El
                ganador será anunciado en un plazo máximo de siete días calendarios
                posteriores al sorteo, a través de una publicación en el Diario
                Depor versión Print.Así mismo, tendrá cinco días calendarios para
                reclamar el premio, contados desde la publicación.Posterior a ese
                plazo, el ganador perderá el derecho de reclamarlo.
              </p>
              <p>
                El lector podrá votar hasta el 31 de diciembre del 2021 y los
                resultados finales serán publicados en el Print del diario Depor el
                04 de enero de 2022.
              </p>
            </div>
          )}
        </div>
        {isMobile ? (
          <div className={isRankingTrome ? classes.linesMobTrome : classes.linesMobDepor} />
        ) : (
          <img
            src={isRankingTrome ? pathT : pathD}
            className={classes.lines}
            alt="green lines"
          />
        )}
      </div>
    </div>
  )
}
export default Terms
