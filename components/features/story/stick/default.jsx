import React, { PureComponent } from 'react'
import customFields from './_dependencies/custom-fields'

const classes = {
  stick: 'stick',
  closeApp: 'stick__close-app',
  logo: 'stick__logo',
  logoLink: 'stick__logo-link',
  description: 'stick__description',
  logoLink: 'button-app',
  link: 'button-app',
}

class Stick extends PureComponent {
  componentDidMount() {
    const {
      customFields: { urlPwd = '', appData = '', href = '' } = {},
    } = this.props

    var aOpenApp = document.getElementById('button-app')
    var dataPageId = aOpenApp.getAttribute('data-page-id') || '/'

    console.log(
      'b: =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      `${urlPwd}${window.location.pathname}/?appData=/${dataPageId !== '/' &&
        'news/'}${dataPageId}${appData}${window.location.href}${href}`
    )

    aOpenApp.addEventListener('click', function(ev) {
      ev.preventDefault()

      window.location.href = `${urlPwd}${
        window.location.pathname
      }/?appData=/${dataPageId !== '/' && 'news/'}${dataPageId}${appData}${
        window.location.href
      }${href}`
    })
  }

  render() {
    const { customFields: { urlPwd = '' } = {} } = this.props

    const { globalContent, contextPath } = this.props

    const { link } = new StoryData({
      data: globalContent,
      contextPath,
    })

    return (
      <div className={classes.stick}>
        <a href="#" className={classes.closeApp} />
        <div className={classes.logo}>
          <a className={classes.logoLink} />
        </div>
        <div className={classes.description}>
          Sigue actualizado en nuestra APP
        </div>
        <div className={classes.link}>
          <a
            href=""
            className={classes.buttonApp}
            id="button-app"
            data-url-pwd={urlPwd}
            data-page-id={link}>
            Abrir en App
          </a>
        </div>
      </div>
    )
  }
}

StoryComentario.propTypes = {
  customFields,
}

Stick.label = 'Artículo - Abrir en App'
// Stick.static = true

export default Stick
