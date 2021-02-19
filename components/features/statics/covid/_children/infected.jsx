import * as React from 'react'

/**
 * @see estilos `src/websites/elcomercio/scss/components/statics/covid/_infected.scss`
 */

const classes = {
  wrapper: 'infected__wrapper',
  closeButton: 'infected__close-button',
  title: 'infected__title',
  subtitle: 'infected__subtitle',
  buttonWrapper: 'infected__btn-wrapper',
  sectionsWrapper: 'infected__sections_wrapper',
  regionsWrapper: 'infected__rgn_wrapper',
  regionTitle: 'infected__rgn_title',
  itemsList: 'infected__items_list',
  itemUp: 'infected__item up',
  itemDown: 'infected__item down',
  itemEquals: 'infected__item equals',
  button: 'infected__button',
  homeButton: 'infected__home-button',
}

const StaticsCovidInfected = () => {
  return (
    <div className={classes.wrapper}>
      <button type="button" className={classes.closeButton}>
        X
      </button>
      <h1 className={classes.title}>Contagiados</h1>
      <h2 className={classes.subtitle}>Elige tu departamento</h2>
      <div className={classes.buttonWrapper}>
        <button type="button" className={classes.button}>
          Lima
        </button>
        <button type="button" className={classes.button}>
          Nacional
        </button>
      </div>
      <div className={classes.sectionsWrapper}>
        <ul className={classes.regionsWrapper}>
          <li className={classes.regionTitle}>
            Lima Norte
            <ul className={classes.itemsList}>
              <li className={classes.itemDown}>S.M. de Porres</li>
              <li className={classes.itemEquals}>Independencia</li>
              <li className={classes.itemUp}>Comas</li>
              <li>Los Olivos</li>
              <li>Puente Piedra</li>
              <li>Carabayllo</li>
              <li>Ancón</li>
              <li>Santa Rosa</li>
            </ul>
          </li>
          <li className={classes.regionTitle}>
            Lima Centro
            <ul className={classes.itemsList}>
              <li>Cercado de Lima</li>
              <li>Rímac</li>
              <li>Breña</li>
              <li>La Victoria</li>
              <li>San Miguel</li>
              <li>Lince</li>
              <li>Magdalena</li>
              <li>San Isidro</li>
              <li>San Borja</li>
              <li>Surquillo</li>
              <li>Miraflores</li>
              <li>Barranco</li>
              <li>Santiago de Surco</li>
            </ul>
          </li>
          <li className={classes.regionTitle}>
            Lima Este
            <ul className={classes.itemsList}>
              <li>S.J. de Lurigancho</li>
              <li>El Agustino</li>
              <li>Santa Anita</li>
              <li>San Luis</li>
              <li>Ate</li>
              <li>La Molina</li>
              <li>Cieneguilla</li>
              <li>Chaclacayo</li>
              <li>Lurigancho</li>
            </ul>
          </li>
          <li className={classes.regionTitle}>
            Lima Sur
            <ul className={classes.itemsList}>
              <li>Chorrillos</li>
              <li>S.J. de Miraflores</li>
              <li>V.M. del Triunfo</li>
              <li>Villa el Salvador</li>
              <li>Pachacamac</li>
              <li>Lurín</li>
              <li>Punta Hermosa</li>
              <li>Punta Negra</li>
              <li>San Bartolo</li>
              <li>Santa María</li>
              <li>Pucusana</li>
            </ul>
          </li>
          <li className={classes.regionTitle}>
            Callao
            <ul className={classes.itemsList}>
              <li>Callao Cercado</li>
              <li>LA Perla</li>
              <li>Carmen de la Legua</li>
              <li>La Punta</li>
              <li>Bellavista</li>
              <li>Ventanilla</li>
              <li>Mi Perú</li>
            </ul>
          </li>
        </ul>
      </div>
      <button type="button" className={classes.homeButton}>
        Inicio
      </button>
    </div>
  )
}

export default StaticsCovidInfected
