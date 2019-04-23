import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

import textCookies from './tpl-cookies'

@Consumer
class CookiePolitics extends Component {
  render() {
    const { customFields: { contentEditor } = {} } = this.props

    const classes = {
      container: 'text-editor-container col-3',
      textEditor: `text-editor-container__editor col-3`,
      arrow: `text-editor-container__arrow`,
    }

    return (
      <div className={classes.container}>
        <span className={classes.arrow} />
        <section
          className={classes.textEditor}
          dangerouslySetInnerHTML={{ __html: contentEditor || textCookies }}
        />
      </div>
    )
  }
}

CookiePolitics.propTypes = {
  customFields: PropTypes.shape({
    contentEditor: PropTypes.disabled.tag({
      name: 'Texto de Edicion',
      formPlugin: 'text-editor',
      defaultValue: textCookies,
    }),
  }),
}

CookiePolitics.label = 'Texto Politica de Cookies'

export default CookiePolitics
