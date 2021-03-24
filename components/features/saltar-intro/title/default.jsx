import * as React from 'react'
import PropTypes from 'prop-types'
// import { useAppContext } from 'fusion:context'
// import { useEditableContent } from 'fusion:content'

const classes = {
  container: 'saltar-intro-title__container flex',
  title: 'saltar-intro-title__title',
  boxLine: 'saltar-intro-title__box-line',
  line: 'saltar-intro-title__line',
}
const SaltarIntroTitle = props => {
  const {
    customFields: { title, color = '#575757', modeSection },
  } = props
  const classModeSection = modeSection ? 'saltar-intro-title__container--section': ''
  return (
    <div className={`${classes.container} ${classModeSection}`}>
      <div className={classes.boxLine}>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
      </div>
      <h2 className={classes.title} style={{ color }}>
        {title}
      </h2>
    </div>
  )
}

SaltarIntroTitle.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      name: 'Título personalizado',
    }),
    color: PropTypes.string.tag({
      name: 'Color',
      description: 'Ejm: red, blue, #ffffff, #000',
    }),
    modeSection: PropTypes.bool.tag({
      name: 'Título para secciones',
      defaultValue: false,
    }),
  }),
}

SaltarIntroTitle.label = 'Título - Saltar Intro'
SaltarIntroTitle.static = true
export default SaltarIntroTitle
