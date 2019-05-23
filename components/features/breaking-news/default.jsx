/* eslint-disable no-undef */
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import schemaFilter from './_dependencies/schema-filter'

const classes = {
  breakingnews: 'flex',
  breakingnewsBtnClose: 'cintillo-u__btn-close text-center',
  breakingnewsIcon: 'cintillo-u__btn-icon icon-close-circle',
  breakingnewsText: 'cintillo-u__text',
  breakingnewsTag: 'cintillo-u__tag',
  breakingnewsLink: 'cintillo-u__link',
}

@Consumer
class BreakingNews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: {},
      isVisible: false,
    }
  }

  componentWillMount() {
    const status = localStorage.link
    const {
      customFields: { storyLink },
    } = this.props
    if (status && status === storyLink) {
      this.setState({ isVisible: false })
    } else this.setState({ isVisible: true })
  }

  componentDidMount = () => {
    this.fetch()
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isVisible, article } = this.state
    return isVisible !== nextState.isVisible || article !== nextState.article
  }

  handleOnclickClose = () => {
    this.setState({
      isVisible: false,
    })
    const {
      customFields: { storyLink },
    } = this.props
    localStorage.setItem('link', storyLink)
  }

  fetch() {
    const {
      customFields: { storyLink, isExternalLink },
      arcSite,
    } = this.props
    if (
      storyLink &&
      (isExternalLink === undefined || isExternalLink === false)
    ) {
      const { fetched } = this.getContent(
        'story-by-url',
        { website_url: storyLink, website: arcSite },
        schemaFilter
      )
      fetched.then(response => {
        this.setState({ article: response || {} })
      })
    }
  }

  render() {
    const { article, isVisible } = this.state || {}
    const {
      editableField,
      arcSite,
      customFields: { backgroundColor, tags, title, subTitle, storyLink },
    } = this.props
    const webUrlService =
      storyLink !== '' ? `${storyLink}?_website=${arcSite}` : ''
    const objContent = {
      title: title || (article && article.headlines && article.headlines.basic),
      subTitle:
        subTitle ||
        (article && article.subheadlines && article.subheadlines.basic),
      link: webUrlService,
    }
    return (
      <div
        className={`cintillo-u ${isVisible ? '' : 'hide'}
          ${backgroundColor} 
          ${classes.breakingnews}
          `}>
          <h2 className={classes.breakingnewsText}>
          <span className={classes.breakingnewsTag} {...editableField('tags')}>
            {tags}
          </span>
          <span>
            <a
              // className={classes.breakingnewsLink}
              href={objContent.link}
              target="_blank"
              rel="noopener noreferrer"
              {...editableField('title')}>
              {objContent.title}
            </a>
          </span>
        </h2>
        <div
          className={classes.breakingnewsBtnClose}
          onClick={this.handleOnclickClose}
          // Static HTML elements do not have semantic meaning.
          // Needs a role, to be focusable and to have a key event
          onKeyPress={this.handleOnclickClose}
          role="button"
          tabIndex={0}>
          <i className={classes.breakingnewsIcon}></i>
        </div>
     
      </div>
    )
  }
}

BreakingNews.propTypes = {
  customFields: PropTypes.shape({
    settingLink: PropTypes.label.tag({
      name: 'Configuración de link',
    }),
    isExternalLink: PropTypes.bool.tag({
      name: '¿Nota externa?',
      defaultValue: false,
    }),
    storyLink: PropTypes.string.isRequired.tag({
      name: 'Link de nota interna',
    }),
    settingContent: PropTypes.label.tag({
      name: 'Configuración de contenido',
    }),
    backgroundColor: PropTypes.oneOf([
      'cintillo-u--bgcolor-1',
      'cintillo-u--bgcolor-2',
    ]).tag({
      name: 'Color de fondo',
      labels: {
        'cintillo-u--bgcolor-1': 'Color 1',
        'cintillo-u--bgcolor-2': 'Color 2',
      },
      defaultValue: 'cintillo-u--bgcolor-1',
    }),
    tags: PropTypes.string.tag({ name: 'Etiqueta' }),
    title: PropTypes.string.tag({
      name: 'Título',
      description: 'Dejar vacío para tomar el valor original de la historia.',
    }),
    subTitle: PropTypes.string.tag({ name: 'Descripción', hidden: true }),
  }),
}

BreakingNews.label = 'Cintillo Urgente'

export default BreakingNews
