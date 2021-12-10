import React from 'react'

const classes = {
  box: 'premios_depor__terminos__box',
  green: 'premios_depor__terminos__box__green',
  black: 'premios_depor__terminos__box__black',
  text: 'premios_depor__terminos__box__black__text',
  title: 'premios_depor__terminos__box__black__text__titulo',
  content: 'premios_depor__terminos__box__black__text__contenido',
  lines: 'premios_depor__terminos__box__black__lines',
  linesMob: 'premios_depor__terminos__box__black__linesMob',
}

let isMobile
if (typeof window !== 'undefined')
  isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    window.navigator.userAgent
  )

const Terms = () => (
  <div className={classes.box}>
    <div className={classes.green} />
    <div className={classes.black}>
      <div className={classes.text} id="termsid">
        <div className={classes.title}>Términos y Condiciones</div>
        <div className={classes.content}>
          <p>
            Para participar de la campaña “<b>PREMIOS DEPOR 2021</b>” a nivel
            nacional, el lector deberá ingresar a la página web
            https://depor.com/ o escanear el código QR que se encuentra en las
            piezas publicitarias de la campaña.
            <br /> Luego de ello, el lector será redirigido a la web site de la
            campaña Premios Depor en la cual podrá votar por los/las deportistas
            más destacados en las siguientes categorías: futbolista del año,
            jugador revelación, mejor técnico, mejor peruanos en el extranjero,
            futbolista femenina, voley, lucha, freestyle, surf, equipo de
            e-sports y deportista del año.
            <br /> Cada categoría tendrá 5 nominados y el lector deberá votar
            por aquel deportista que, a su criterio, mejor represente cada una
            de estas.
            <br /> Solo se permite un voto por cada categoría. Al deportista
            ganador de cada categoría se le hará entrega de un trofeo “Premios
            Depor 2021” correspondiente al rubro en el que haya destacado.
          </p>
          <p>
            Entre los lectores votantes de la campaña se sorteará una
            Playstation 5. Fecha del sorteo: miércoles 29 de diciembre del 2021.
            El ganador será anunciado en un plazo máximo de siete días
            calendarios posteriores al sorteo, a través de una publicación en el
            Diario Depor versión Print. Así mismo, tendrá cinco días calendarios
            para reclamar el premio, contados desde la publicación. Posterior a
            ese plazo, el ganador perderá el derecho de reclamarlo.
          </p>
          <p>
            El lector podrá votar hasta el 28 de diciembre del 2021 y los
            resultados finales serán publicados en el Print del diario Depor el
            01 de enero de 2022.
          </p>
        </div>
      </div>
      {isMobile ? (
        <div className={classes.linesMob} />
      ) : (
        <img
          src="https://cdna.depor.com/resources/dist/depor/premios-depor/green_lines.svg"
          className={classes.lines}
          alt="green lines"
        />
      )}
    </div>
  </div>
)
export default Terms
