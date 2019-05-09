import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import { createMarkup } from '../../../utilities/helpers'
import cookiesText from './_dependencies/cookies-tpl'

const classes = {
  container: 'text-editor-container full-width',
  textEditor: `text-editor-container__editor full-width`,
  arrow: `text-editor-container__arrow`,
}

@Consumer
class StaticCookiePolicies extends PureComponent {
  render() {
    const { customFields: { contentEditor } = {} } = this.props

    return (
      <div className={classes.container}>
        <span className={classes.arrow} />
        <section
          className={classes.textEditor}
          dangerouslySetInnerHTML={createMarkup(contentEditor || cookiesText)}
        />
      </div>
    )
  }
}

StaticCookiePolicies.propTypes = {
  customFields: PropTypes.shape({
    contentEditor: PropTypes.disabled.tag({
      name: 'Editor de texto',
      formPlugin: 'text-editor',
      defaultValue: cookiesText,
    }),
  }),
}

StaticCookiePolicies.label = 'Política de Cookies'
StaticCookiePolicies.static = true

export default StaticCookiePolicies
