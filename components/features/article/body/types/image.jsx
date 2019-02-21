import React, { Component, Fragment } from "react";
import Consumer from "fusion:consumer";

import Image from "@arc-core-components/element_image";
import renderHTML from 'react-render-html';
import { resizerSecretKey } from 'fusion:environment';






import source, { addResizedUrls } from "@arc-core-components/content-source_content-api-v4";

const classes = {
    image: [
        'visual__image',
        'visual__image--cover'
    ],
    description: [
        'news-media-description'
    ]
}
@Consumer
class ImageConent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const resizerUrl = "api.sandbox.elcomercio.arcpublishing.com";
        console.log(resizerSecretKey); debugger;
        const vv = addResizedUrls(this.props.data, 'my-resizer-endpoint.com', resizerSecretKey);
        console.log(vv); debugger;
        const resizerSecretKeyEnvVar = "2018-12:1e2d52d4ead4a36107f31f30ad5d2562";
      //  console.log(source); debugger;
        console.log(resizerUrl); debugger;
        const ecretKey = resizerUrl;
        console.log(addResizedUrls(this.props.data, resizerUrl, resizerSecretKeyEnvVar));
        console.log(source); debugger;

        return (
            <Fragment>

                <Image url={props.data.url} alt="" className={ classes.image }  />
                {props.data.caption &&
                    <figcaption className={ classes.description }>
                        {renderHTML(props.data.caption)}</figcaption>}
            </Fragment>
        );
    }

}

export default ImageContent;