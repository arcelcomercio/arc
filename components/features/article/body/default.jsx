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

@Consumer
class ContentArticleBody extends Component {
  render() {
    const { content_elements: contentElements, promo_items: promo_items, publish_date: date } = this.props.globalContent;

    const elementClasses = {
      textClasses: "font--secondary",
      headerClasses: "font--primary",
      imageClasses: "visual__image visual__image--cover"
    };

    return (
      <Fragment>
        <div className='news-text-content col-2'>
          {(promo_items) &&
            <ElePrincipal data={promo_items} />
          }
          <div class="news-author-date">
              <a href="/autor/redaccion-ec">Redactor </a>
              <Moment format="DD.MM.YYYY / HH:I LT " class="news-date" date={date && date} />
          </div>
          {contentElements && (
            <ArticleBody class='news-text-content '
              data={contentElements}
              elementClasses={elementClasses}
              renderElement={element => {
                const { type } = element
                if (type === 'image') {
                  return <Imagen data={element} />
                }
                if (type === 'video') {
                  return <Video data={element.embed_html} className="visual__image visual__image--cover" />
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
