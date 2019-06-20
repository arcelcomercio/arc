/* eslint-disable no-undef */
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import schemaFilter from './_dependencies/schema-filter'

const classes = {
  breakingnews:
    'breaking-news secondary-font flex justify-between p-15 text-white',
  close: 'breaking-news__btn-close text-right',
  icon: 'breaking-news__btn-icon icon-close-circle title-sm text-white',
  text: 'breaking-news__text m-0 font-normal title-xs line-h-xs',
  tag: 'breaking-news__tag uppercase mr-5',
  link: 'breaking-news__link mr-5 text-white',
}

@Consumer
class BreakingNews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: {},
      isVisible: false,
    }
    const {
      customFields: { storyLink = '' },
    } = this.props
    this.isExternalLink = storyLink.includes('http')
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

  // TODO: revisar si esto es necesario
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
      customFields: { storyLink },
      arcSite,
    } = this.props

    if (!this.isExternalLink) {
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
      customFields: {
        title,
        subTitle,
        storyLink,
        tags = 'Lo último',
        backgroundColor = 'breaking-news--bgcolor-1',
      },
      contextPath,
    } = this.props
    const webUrlService = !this.isExternalLink
      ? `${contextPath}${storyLink}`
      : storyLink
    const objContent = {
      title: title || (article && article.headlines && article.headlines.basic),
      subTitle:
        subTitle ||
        (article && article.subheadlines && article.subheadlines.basic),
      link: webUrlService,
    }
    return (
      <div
        className={`${isVisible ? '' : 'hidden'}
          ${backgroundColor} 
          ${classes.breakingnews}
          `}>
        <h2 className={classes.text}>
          <span
            className={classes.tag}
            {...editableField('tags')}
            suppressContentEditableWarning>
            {tags}:
          </span>
          <span>
            <a
              className={classes.link}
              // className={classes.link}
              href={objContent.link}
              target="_blank"
              rel="noopener noreferrer"
              {...editableField('title')}
              suppressContentEditableWarning>
              {objContent.title}
            </a>
          </span>
        </h2>
        <div
          className={classes.close}
          onClick={this.handleOnclickClose}
          // Static HTML elements do not have semantic meaning.
          // Needs a role, to be focusable and to have a key event
          onKeyPress={this.handleOnclickClose}
          role="button"
          tabIndex={0}>
          <i className={classes.icon} />
        </div>
      </div>
    )
  }
}

BreakingNews.propTypes = {
  customFields: PropTypes.shape({
    /* isExternalLink: PropTypes.bool.tag({
      name: '¿Nota externa?',
      defaultValue: false,
    }), */
    storyLink: PropTypes.string.isRequired.tag({
      name: 'SLUG',
    }),
    title: PropTypes.string.tag({
      name: 'Título',
      description: 'Dejar vacío para tomar el valor original de la historia.',
    }),
    tags: PropTypes.string.tag({ name: 'Etiqueta' }),
    backgroundColor: PropTypes.oneOf([
      'breaking-news--bgcolor-1',
      'breaking-news--bgcolor-2',
    ]).tag({
      name: 'Color de fondo',
      labels: {
        'breaking-news--bgcolor-1': 'Principal',
        'breaking-news--bgcolor-2': 'Secundario',
      },
      defaultValue: 'breaking-news--bgcolor-1',
    }),

    subTitle: PropTypes.string.tag({ name: 'Descripción', hidden: true }),
  }),
}

BreakingNews.label = 'Cintillo Urgente'

export default BreakingNews
