/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import { filterSchema } from './_children/filterschema'

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
    this.state = {
      contentBreakingNews: 'cintillo-u',
      article: {}
    }
    this.renderCount = 0
    this.fetch()
  }
  
  componentDidMount = () => {
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

  fetch() {
    if(this.props.customFields.storyLink){
        const { fetched } = this.getContent(
            'get-story-by-websiteurl', 
            { website_url: this.props.customFields.storyLink, website: this.props.arcSite }, 
            filterSchema
        )
        fetched.then(response => {
            this.setState({ article: response })
        })
    }
  }

  render() {
    console.log('apertura extraordinaria render', ++this.renderCount)
    // console.log('state', this.state)
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
        storyLink
      },
    } = this.props
    const webUrlService = 
      storyLink !== '' ? `${storyLink}?_website=${arcSite}` : ''
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
    settingLink: PropTypes.label.tag({
      name: 'Configuración de link'
    }),
    storyLink: PropTypes.string.isRequired.tag({
      name: 'Link de nota interna'
    }),
    isExternalLink: PropTypes.bool.tag({ name: '¿Nota externa?' }),
    link: PropTypes.string.tag({
      name: 'Link externo',
      fieldType: 'url',
    }),
    settingContent: PropTypes.label.tag({
      name: 'Configuración de contenido'
    }),
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
    title: PropTypes.string.tag({
      name: 'Título',
      description: 'Dejar vacío para tomar el valor original de la noticia.'
    }),
    subTitle: PropTypes.string.tag({ name: 'Descripción', hidden: true })
  })
}
export default CintilloUrgente
