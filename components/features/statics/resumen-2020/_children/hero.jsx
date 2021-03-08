import * as React from 'react'
import { slugify } from '../../../../utilities/parse/slugify'

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
  content,
  mainPath,
  listDesc,
}) => {
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
      <p className={classes.select}>{listDesc}</p>
      <nav className={classes.heroContent}>
        {content.map(({ seccion }) => {
          return (
            <a
              href={`/${mainPath}/${slugify(seccion)}/`}
              className={classes.month}>
              {seccion}
            </a>
          )
        })}
      </nav>
    </section>
  )
}

export default React.memo(StaticsResumen2020Hero)
