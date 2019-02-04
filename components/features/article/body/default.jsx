import ArticleBody from "@arc-core-components/feature_article-body";
import Image from "@arc-core-components/element_image";
import Heading from './types/heading'
import Subheading from './types/subheading'
import Video from './types/video'
import Gallery from './types/gallery'

import Consumer from "fusion:consumer";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

@Consumer
class ContentArticleBody extends Component {
  render() {
    const { content_elements: contentElements } = this.props.globalContent;

    const elementClasses = {
      textClasses: "font--secondary",
      headerClasses: "font--primary",
      imageClasses: "visual__image visual__image--cover"
    };

    return (
      <Fragment>
      <Heading />
      <Subheading />
      {contentElements && (
      <ArticleBody class='news-text-content'
        data={contentElements}
        elementClasses={elementClasses}
        renderElement={element => {
            const { type } = element 
            if (type === 'image') {
              return <Image url={element.url} alt="" className="visual__image visual__image--cover" />
            }
            if (type === 'video') {
              return <Video data={element.embed_html} className="visual__image visual__image--cover"/>
            }
            if (type === 'gallery') {
             // return <Gallery  />
             return <Gallery data={element} className="image--cover"/>
            }
            }
        }
      />
    )}
      </Fragment>
    );
  }
}

ContentArticleBody.propTypes = {
  globalContent: PropTypes.object
};

export default ContentArticleBody;
