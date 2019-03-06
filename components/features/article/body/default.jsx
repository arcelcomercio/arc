import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ArticleBody from '@arc-core-components/feature_article-body'

import Video from './types/video'
import Imagen from './types/image'
import Gallery from '../header/types/gallery'
import Blockquote from './types/blockquote'
import Table from './types/table'
import Autor from './types/autor'
import ElePrincipal from './types/ele-principal'

const elementClasses = {
  textClasses: 'font--secondary',
  headerClasses: 'font--primary',
  imageClasses: 'visual__image visual__image--cover',
  news: 'news-text-content col-2 padding-normal bg-color--white',
  newsImage: 'visual__image visual__image--cover',
}
@Consumer
class ContentArticleBody extends Component {
  render() {
    const {
      globalContent: {
        content_elements: contentElements,
        promo_items: promoItems,
        publish_date: date,
        credits: author,
      },
    } = this.props
    console.log(contentElements)

    return (
      <Fragment>
        <div className={elementClasses.news}>
          {promoItems && <ElePrincipal data={promoItems} />}
          {author && <Autor data={author} date={date} />}
          {contentElements && (
            <ArticleBody
              data={contentElements}
              elementClasses={elementClasses}
              renderElement={element => {
                const { type } = element
                if (type === 'image') {
                  return (
                    <Imagen
                      data={element}
                      className={elementClasses.newsImage}
                    />
                  )
                }
                if (type === 'video') {
                  return (
                    <Video
                      data={element.embed_html}
                      className={elementClasses.newsImage}
                    />
                  )
                }
                if (type === 'gallery') {
                  return <Gallery data={element} type={type} />
                }
                if (type === 'table') {
                  return <Table data={element} type={type} />
                }
                if (type === 'quote') {
                  return <Blockquote data={element} />
                }
                if (type === 'oembed_response') {
                  return ''
                }
              }}
            />
          )}
        </div>
      </Fragment>
    )
  }
}

ContentArticleBody.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  globalContent: PropTypes.object,
}

export default ContentArticleBody
