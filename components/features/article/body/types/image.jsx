// content/sources/content-api-v4.js
import React, { Component, Fragment } from "react";
import Consumer from "fusion:consumer";

import Image from "@arc-core-components/element_image";
import renderHTML from "react-render-html";

import { FormatClassName } from "../../../../../resources/utilsJs/utilities";

const classes = FormatClassName({
  image: ["visual__image", "visual__image--cover"],
  description: ["news-media-description"]
});
@Consumer
class ImageConent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Image
          url={"http://" + this.props.data.resized_urls["2:3"]}
          aspectRatio="16:9"
          alt={this.props.data.subtitle}
          className={classes.image}
        />
        {this.props.data.caption && (
          <figcaption className={classes.description}>
            {renderHTML(this.props.data.caption)}
          </figcaption>
        )}
      </Fragment>
    );
  }
}
export default ImageConent;
