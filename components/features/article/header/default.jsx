import Heading from './types/heading'
import Subheading from './types/subheading'
import Gallery from './types/gallery'
import Share from './types/share'
import  './article.css';

import Consumer from "fusion:consumer";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { FormatClassName } from '../../../../resources/utilsJs/utilities'

const classes = FormatClassName({
  news: [
    'col-3',
    'padding-normal',
    'bg-color--white'

  ],
  gallery: [
    'col-3',
    '_gallery--cover',
  ]

})
@Consumer
class ArticleHeader extends Component {
  render() {
  
    
    const { content_elements: contentElements, website_url: baseUrl , headlines: title, promo_items:gallery_items  } = this.props.globalContent;
    //console.log(gallery_items); debugger;
    const { content_elements: galleryElements } = (gallery_items && typeof gallery_items.gallery !== "undefined") ?  gallery_items.gallery:'';

    //console.log(contentElements);debugger;
    return (
      <Fragment>
        <div className={(typeof galleryElements ===  "undefined") ? classes.news : classes.gallery}>
          <Heading />
          <Subheading />
          <Share url={baseUrl} title={title} />
          {(typeof galleryElements ===  "undefined") ? '':
              <Gallery data={gallery_items.gallery}  />
          }
        </div>
      </Fragment>
    );
  }
}

ArticleHeader.propTypes = {
  globalContent: PropTypes.object
};

export default ArticleHeader;
