import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import { createMarkup } from '../../../utilities/helpers'
import cookiesText from './_dependencies/cookies-tpl'

const classes = {
  container: 'text-editor-container p-30 w-full position-relative',
  textEditor: `text-editor-container__editor w-full`,
  arrow: `text-editor-container__arrow border-solid w-0 h-0 position-absolute`,
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

export default StaticCookiePolicies
