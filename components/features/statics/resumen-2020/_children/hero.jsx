import * as React from 'react'
import PropTypes from 'prop-types'
import { arrayMonths } from '../../../../utilities/helpers'

/**
 * @todo Al hacer click a un mes, se debe redirigir al listado del mes que corresponde
 * @todo Se espera que el boton correspondiente al mes activo tenga un "estado" (que quede de otro color o algo asi)
 * @see estilos src/websites/elcomercio/scss/components/statics/resumen-2020/_hero.scss
 */
const classes = {
  hero: 'hero',
  header: 'hero__header',
  heroContent: 'hero__c',
  month: 'hero__month',
  title: 'hero__title',
  subtitle: 'hero__subtitle',
  year: 'hero__year',
  select: 'hero__select',
}
const StaticsResumen2020Hero = ({ title, year, subtitle, children }) => {
  return (
    <>
      <section className={classes.hero}>
        {children /** dejar este children, es la publicidad */}

        <div className={classes.header}>
          <div className={classes.title}>{title}</div>
          <div className={classes.year}>{year}</div>
          <div className={classes.subtitle}>{subtitle}</div>
          <div className={classes.select}>Selecciona un mes:</div>
        </div>
        <div className={classes.heroContent}>
          {arrayMonths.map(element => {
            return (
              <>
                <div className={classes.month}>
                  <a href={`/resumen-2020/${element}/`}>
                    {element.charAt(0).toUpperCase() + element.substr(1)}
                  </a>
                </div>
              </>
            )
          })}
        </div>
      </section>
    </>
  )
}

StaticsResumen2020Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  children: PropTypes.node,
}

export default StaticsResumen2020Hero
