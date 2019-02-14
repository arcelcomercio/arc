import ArticleBody from "@arc-core-components/feature_article-body";

import Video from './types/video'
import Imagen from './types/image'
import Gallery from '../header/types/gallery'
import Consumer from "fusion:consumer";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Blockquote from "./types/blockquote"
import Table from './types/table'
import Autor from './types/autor'
import ElePrincipal from './types/ele-principal'

import { FormatClassName } from '../../../../resources/utilsJs/utilities'

const styles = FormatClassName({
  news: [
    'news-text-content',
    'col-2'
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
          {(author) && <Autor data={author} date={date} />}
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
                if (type === 'quote') {
                  return <Blockquote data={element} />;
                }
                if (type === 'oembed_response') {
                  return;
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
