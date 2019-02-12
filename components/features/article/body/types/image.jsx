import Image from "@arc-core-components/element_image";
import React, { Fragment } from "react";
import renderHTML from 'react-render-html';


const ImageConent = (props) => {
    return (
        <Fragment>
            <Image url={props.data.url} alt="" className="visual__image visual__image--cover" />
            {props.data.caption &&
                <figcaption class="news-media-description">
                    {renderHTML(props.data.caption)}</figcaption>}
        </Fragment>
    );
}

export default ImageConent;