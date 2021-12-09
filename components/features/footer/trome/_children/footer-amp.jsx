import React from 'react'

const classes = {
  wrapper: 'footer-trome__wrapper',
  logo: 'footer-trome__logo',
  column: 'footer-trome__column',
  lastColumn: 'footer-trome__last-column',
}

const FooterAmp = () => (
  <footer className={classes.wrapper}>
    <div className={classes.logo}>
      <amp-img
        width="118"
        height="32"
        src="https://cdna.trome.pe/resources/dist/trome/images/logo.png?d=1"
        alt="Logo Trome"
      />
    </div>
    <div className={classes.column}>
      Editora web: <br />
      <strong>Marilyn Corrales</strong>
      <br />
      <strong>webmaster@trome.com</strong>
      <br />
      Publicidad web: <br />
      <strong>Fonoavisos@comercio.com.pe</strong>
      <br />
    </div>
    <div className={classes.column}>
      <a href="/terminos-y-condiciones/">Términos y condiciones de uso</a>
      <br />
      <a href="/politica-de-privacidad/">Políticas de Privacidad</a>
      <br />
      <a href="/politica-de-cookies/">Políticas de Cookies</a>
      <br />
    </div>
    <div className={classes.column}>
      Grupo El Comercio S.A.C.
      <br />
      Jr. Jorge Salazar Araoz Nro. 171
      <br />
      Urb. Santa Catalina, LA Victoria, Lima - Perú
      <br />
      Copyright&copy; Trome.pe - Grupo El Comercio
      <br />
      Todos los derechos reservados.
      <br />
    </div>
  </footer>
)

export default React.memo(FooterAmp)
