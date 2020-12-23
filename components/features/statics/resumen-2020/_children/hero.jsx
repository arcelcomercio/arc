import * as React from 'react'
import PropTypes from 'prop-types'

const arrayMonths = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
]

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

/**
 * @see estilos src/websites/elcomercio/scss/components/statics/resumen-2020/_hero.scss
 */
const StaticsResumen2020Hero = ({
  title,
  year,
  subtitle,
  children,
  requestUri,
}) => {
  const [, activeMonth = ''] =
    requestUri.match(/^\/resumen-2020\/(\w{4,10})\//) || []

  return (
    <section className={classes.hero}>
      {children /** dejar este children, es la publicidad */}

      <h1
        className={classes.header}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <span className={classes.title}>{title.toUpperCase()}</span>
        <span className={classes.year}>{year}</span>
        <span className={classes.subtitle}>{subtitle}</span>
      </h1>
      <p className={classes.select}>Selecciona un mes:</p>
      <nav className={classes.heroContent}>
        {arrayMonths.map(element => {
          const isActiveMonth = element === activeMonth.toLowerCase()
          return (
            <a
              href={`/resumen-2020/${element}/`}
              className={`${classes.month} ${isActiveMonth ? 'active' : ''}`}>
              {element.charAt(0).toUpperCase() + element.substr(1)}
            </a>
          )
        })}
      </nav>
    </section>
  )
}

StaticsResumen2020Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  children: PropTypes.node,
  requestUri: PropTypes.string,
}

export default React.memo(StaticsResumen2020Hero)
