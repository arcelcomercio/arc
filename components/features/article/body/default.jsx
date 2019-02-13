import ArticleBody from "@arc-core-components/feature_article-body";

import Video from './types/video'
import Imagen from './types/image'
import Gallery from '../header/types/gallery'
import Consumer from "fusion:consumer";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Table from './types/table'
import ElePrincipal from './types/ele-principal'
import Moment from 'react-moment'
import { FormatClassName } from '../../../../resources/utilsJs/utilities'

const styles = FormatClassName({
  news: [
    'news-text-content',
    'col-2'
  ],
  newsAuthor: [
    'news-author-date'
  ],
  newsImage: [
    'visual__image',
    'visual__image--cover'
  ]
})
@Consumer
class ContentArticleBody extends Component {
  render() {
    const { content_elements: contentElements, promo_items: promo_items, publish_date: date, credits: author } = this.props.globalContent;
    const elementClasses = {
      textClasses: "font--secondary",
      headerClasses: "font--primary",
      imageClasses: "visual__image visual__image--cover"
    };
    return (
      <Fragment>
        <div className={styles.news}>
          {(promo_items) &&
            <ElePrincipal data={promo_items} />
          }
          <div className={styles.newsAuthor}>
            {author && author.by && author.by[0] &&
              <a href={author && "/" + author.by[0].slug} >{author && author.by[0].name} </a>
            }
            <Moment format="DD.MM.YYYY / LT " date={date && date} />
          </div>
          {contentElements && (
            <ArticleBody
              data={contentElements}
              elementClasses={elementClasses}
              renderElement={element => {
                const { type } = element
                if (type === 'image') {
                  return <Imagen data={element} />
                }
                if (type === 'video') {
                  return <Video data={element.embed_html} className={styles.newsImage} />
                }
                if (type === 'gallery') {
                  return <Gallery data={element} type={type} />;
                }
                if (type === 'table') {
                  return <Table data={element} type={type} />;
                }
              }
              }
            />
          )}
        </div>


      </Fragment>
    );
  }
}

ContentArticleBody.propTypes = {
  globalContent: PropTypes.object
};

export default ContentArticleBody;
