import Image from "@arc-core-components/element_image";
import React, { Fragment } from "react";
import renderHTML from 'react-render-html';

import source from "@arc-core-components/content-source_content-api-v4";
 


const ImageConent = (props) => {
    console.log(source); debugger;
    return (
        <Fragment>
            
            <Image  aspectRatio="3:2" url={props.data.url} alt="" className="visual__image visual__image--cover" />
            {props.data.caption &&
                <figcaption className="news-media-description">
                    {renderHTML(props.data.caption)}</figcaption>}
        </Fragment>
    );
}

export default ImageConent;