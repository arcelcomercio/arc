/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { version } from 'moment'

const classes = {
  breakingnews: 'padding-normal',
  breakingnewsBtnClose: 'cintillo-u__btn-close text-center',
  breakingnewsText: 'cintillo-u__text',
  breakingnewsTag: 'cintillo-u__tag',
  breakingnewsLink: 'cintillo-u__link',
}

@Consumer
class CintilloUrgente extends Component {
  constructor(props) {
    super(props)
    const {
      customFields: {
        articleConfig: { contentService, contentConfigValues },
      },
    } = this.props || {}

    this.state = {
      contentBreakingNews: 'cintillo-u',
    }
    if (contentService !== undefined && contentConfigValues !== undefined) {
      this.fetchContent({
        article: {
          source: contentService,
          query: contentConfigValues,
        },
      })
    }
  }

  componentDidMount = () => {
    // let contentBreakingNews = "cintillo-u";
    const {
      customFields: { link },
    } = this.props

    const status = localStorage.getItem(link)

    if (status === 'false') {
      this.setState({
        contentBreakingNews: 'cintillo-u hide',
      })
    }
  }

  handleOnclickClose = () => {
    const {
      customFields: { link },
    } = this.props
    localStorage.setItem(link, 'false')
    this.setState({
      contentBreakingNews: 'cintillo-u hide',
    })
  }

  render() {
    // const content = this.props.globalContent;
    // const content = this.state.article
    const {
      contentBreakingNews,
      article: { headlines, subheadlines },
    } = this.state || {}
    const {
      editableField,
      arcSite,
      customFields: {
        backgroundColor,
        tags,
        title,
        subTitle,
        isExternalLink,
        link,
        articleConfig,
      },
    } = this.props
    const webUrlService =
      articleConfig !== undefined &&
      articleConfig.contentConfigValues !== undefined
        ? `${articleConfig.contentConfigValues.website_url}?_website=${arcSite}`
        : ''
    const objContent = {
      title: title || (headlines && headlines.basic),
      subTitle: subTitle || (subheadlines && subheadlines.basic),
      link: isExternalLink ? link : webUrlService,
    }
    return (
      <div
        className={`
          ${contentBreakingNews} 
          ${backgroundColor} 
          ${classes.breakingnews}
          `}
      >
        <span
          className={classes.breakingnewsBtnClose}
          onClick={this.handleOnclickClose}
          // Static HTML elements do not have semantic meaning.
          // Needs a role, to be focusable and to have a key event
          onKeyPress={this.handleOnclickClose}
          role="button"
          tabIndex={0}
        >
          x
        </span>
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
              {...editableField('title')}
            >
              {objContent.title}
            </a>
          </span>
        </h2>
      </div>
    )
  }
}

CintilloUrgente.propTypes = {
  customFields: PropTypes.shape({
    backgroundColor: PropTypes.oneOf([
      'cintillo-u--bgcolor-1',
      'cintillo-u--bgcolor-2',
      'cintillo-u--bgcolor-3',
      'cintillo-u--bgcolor-4',
    ]).tag({
      name: 'Color de fondo',
      labels: {
        'cintillo-u--bgcolor-1': 'Color 1',
        'cintillo-u--bgcolor-2': 'Color 2',
        'cintillo-u--bgcolor-3': 'Color 3',
        'cintillo-u--bgcolor-4': 'Color 4',
      },
      defaultValue: 'cintillo-u--bgcolor-1',
    }),
    tags: PropTypes.string.tag({ name: 'Etiqueta' }),
    title: PropTypes.string.isRequired.tag({
      name: 'Título',
      description: 'Dejar vacio para que tome el título de la historia',
    }),
    subTitle: PropTypes.string.tag({ name: 'Descripción', hidden: true }),
    articleConfig: PropTypes.contentConfig('story').tag({
      name: 'Configuración de nota interna',
    }),
    isExternalLink: PropTypes.bool.tag({ name: '¿Nota externa?' }),
    link: PropTypes.string.tag({
      name: 'Link externo',
      fieldType: 'url',
    }),
  }),
}
export default CintilloUrgente
