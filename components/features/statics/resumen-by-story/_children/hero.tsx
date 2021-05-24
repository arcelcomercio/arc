import * as React from 'react'
import { ContentElement } from 'types/story'

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

interface HeroProps {
  name?: string
  title?: string
  description?: string
  children?: React.ReactNode
  content?: ContentElement[]
  mainPath?: string
  text?: string
}

/**
 * @see estilos src/websites/elcomercio/scss/components/statics/resumen-2020/_hero.scss
 */
const StaticsResumen2020Hero: React.FC<HeroProps> = (props) => {
  const { name, title, description, children, content, mainPath, text } = props
  return (
    <section className={classes.hero}>
      {children /** dejar este children, es la publicidad */}

      <h1
        className={classes.header}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <span className={classes.title}>{name?.toUpperCase()}</span>
        <span className={classes.year}>{title}</span>
        <span className={classes.subtitle}>{description}</span>
      </h1>
      <p className={classes.select}>{text}</p>
      <nav className={classes.heroContent}>
        {content?.map(({ embed }) => (
          <a
            href={`${mainPath}${embed?.config?.data?.url}/`}
            title={embed?.config?.data?.name}
            className={classes.month}>
            {embed?.config?.data?.name}
          </a>
        ))}
      </nav>
    </section>
  )
}

export default React.memo(StaticsResumen2020Hero)
