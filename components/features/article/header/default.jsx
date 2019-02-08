import Heading from './types/heading'
import Subheading from './types/subheading'
import Gallery from './types/gallery'
import Share from './types/share'
import  './article.css';

import Consumer from "fusion:consumer";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

@Consumer
class ArticleHeader extends Component {
  render() {
    const { content_elements: contentElements } = this.props.globalContent;
    const { content_elements: galleryElements } = (typeof contentElements === "undefined") ? '' : contentElements[0];
    //console.log(contentElements);debugger;
    return (
      <Fragment>
        <div class={(galleryElements) ? '_gallery col-3' : 'col-3'}>
          <Heading />
          <Subheading />
          <Share />
          {contentElements && contentElements.map((value, key) => {
            if (key == 0 && value.type == 'gallery') {
              return <Gallery data={value} id={key} />;
            }
          })}
        </div>
      </Fragment>
    );
  }
}

ArticleHeader.propTypes = {
  globalContent: PropTypes.object
};

export default ArticleHeader;
