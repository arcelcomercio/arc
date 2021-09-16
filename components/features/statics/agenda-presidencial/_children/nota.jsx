import * as React from 'react'

const classes = {
  contenedor: 'agenda-presidencial__nota__contenedor',

  elecont1: 'agenda-presidencial__nota__elemento__contenedor1',
  eleparrafo: 'agenda-presidencial__nota__elemento__parrafo',
  linea: 'agenda-presidencial__nota__linea',
  eleindicador: 'agenda-presidencial__nota__elemento__indicador',

  elecont2: 'agenda-presidencial__nota__elemento__contenedor2',
  elecaja: 'agenda-presidencial__nota__elemento__caja',
  vernota: 'agenda-presidencial__nota__vernota',
  informe: 'agenda-presidencial__nota__informe',
}

const AgendaNota = () => (
  <>
    <div className={classes.contenedor}>
      <div className={classes.elecont1}>
        <ul>
          <li className={classes.eleparrafo}>
            El presidente se reunió con la presidenta del congreso y dijo. Las
            mil y una pandemias. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris
          </li>
          <li className={classes.eleparrafo}>
            Decreto del Peruano designa como embajador de Perú en a loores ipsum
            loores. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris.
          </li>
          <li className={classes.eleparrafo}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris
          </li>
          <hr className={classes.linea} />
          <li className={classes.eleindicador}>
            Dolar <br />
            <b>COMPRA</b> S/.4.50 (+0.25) <br />
            <b>VENTA</b> S/.4.53 (+0.30)
          </li>
          <li className={`${classes.eleindicador} margin-bottom: 25.54px`}>
            Kilo de pollo: S/.9 (+4.50)
          </li>
        </ul>
      </div>

      <div className={classes.elecont2}>
        <div className={classes.elecaja}>
          <span className={classes.informe}>
            <b>Lee el informe:</b> <br />
            La telaraña de Cerrón. Un conjunto de lorem ipsum loores ipsum
          </span>
          <a
            className={classes.vernota}
            href="https://especiales.elcomercio.pe/?q=especiales/calculadora-eliminatorias-qatar-2022-nndd-ecvisual-ecpm/index.html">
            Ver nota
          </a>
        </div>
      </div>
    </div>
  </>
)

export default AgendaNota
