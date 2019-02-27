import Image from "@arc-core-components/element_image";
import React, { Fragment } from "react";
import renderHTML from 'react-render-html';

const classes = {
    image: [
        'visual__image',
        'visual__image--cover'
    ],
    description: [
        'news-media-description'
    ]
}

const ImageContent = (props) => {
    return (
        <Fragment>
            <Image url={props.data.url} alt="" className={ classes.image } />
            {props.data.caption &&
                <figcaption className={ classes.description }>
                    {renderHTML(props.data.caption)}</figcaption>}
        </Fragment>
    );
}

export default ImageContent;