import React, { Component, Fragment } from "react";
import renderHTML from 'react-render-html';


const Video = (props) => {
    return (
        <Fragment>
            {props &&
                <div className="goldfish-player">
                    {renderHTML(props.data)}</div>}
        </Fragment>
    );
}

export default Video;