import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'

const classes = {
  breakingnews: `breaking-news secondary-font flex justify-between mt-20 md:mt-0 pt-15 pb-15 pl-20 pr-20 text-white`,
  close: 'breaking-news__btn-close text-right text-white',
  icon: 'breaking-news__btn-icon icon-close-circle title-sm text-white',
  text: 'breaking-news__text m-0 title-xs line-h-xs items-center',
  tag: 'breaking-news__tag uppercase mr-5 font-bold',
  link: 'breaking-news__link mr-5 text-white font-bold',
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
    const regex = /^http/g
    this.isExternalLink = regex.test(storyLink)
    if (!this.isExternalLink && storyLink) this.fetch()
  }

  componentWillMount() {
    const status = window.localStorage.link
    const {
      customFields: { storyLink },
    } = this.props
    if (status && status === storyLink) {
      this.setState({ isVisible: false })
    } else this.setState({ isVisible: true })
  }

  shouldComponentUpdate(nextState) {
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
    window.localStorage.setItem('link', storyLink)
  }

  fetch() {
    const {
      customFields: { storyLink = '' },
      arcSite,
    } = this.props

    const params = {
      website_url: storyLink,
      website: arcSite,
    }

    this.fetchContent({
      article: {
        source: 'story-by-url',
        query: params,
        filter: schemaFilter,
      },
    })
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
    } = this.props

    const objContent = {
      title: title || (article && article.headlines && article.headlines.basic),
      subTitle:
        subTitle ||
        (article && article.subheadlines && article.subheadlines.basic),
      link: storyLink,
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
            {tags}
          </span>
          <span>
            <a
              className={classes.link}
              href={objContent.link}
              rel="noopener noreferrer"
              {...editableField('title')}
              suppressContentEditableWarning>
              {objContent.title}
            </a>
          </span>
        </h2>
        <button
          type="button"
          className={classes.close}
          onClick={this.handleOnclickClose}
          onKeyPress={this.handleOnclickClose}
          tabIndex={0}>
          <i className={classes.icon} />
        </button>
      </div>
    )
  }
}

BreakingNews.propTypes = {
  customFields,
}

BreakingNews.label = 'Cintillo Urgente'

export default BreakingNews
