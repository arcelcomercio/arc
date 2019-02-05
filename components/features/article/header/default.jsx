import Heading from './types/heading'
import Subheading from './types/subheading'
import Gallery from './types/gallery'

import Consumer from "fusion:consumer";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

@Consumer
class ArticleHeader extends Component {
  render() {
    const { content_elements: contentElements } = this.props.globalContent;

    return (
      <Fragment>
        <Heading />

        <Subheading />
        {contentElements && contentElements.map((value, key) => {
          if (key == 0 && value.type == 'gallery') {
            return <Gallery data={value} id={key} />;
          }
        })}
      </Fragment>
    );
  }
}

ArticleHeader.propTypes = {
  globalContent: PropTypes.object
};

export default ArticleHeader;
