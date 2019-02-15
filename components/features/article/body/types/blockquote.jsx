import React, { Component, Fragment } from "react";
import Video from './video'
import Imagen from './image'

const Blockquote = (props) => {
    const { citation: citation } = props.data;
    return (
        <Fragment>
            <blockquote>
                <p>
                    Yo llegué en el momento justo, interesado, cuando el hipertexto e Internet habían visto ya la luz. La tarea que me correspondía era hacer que casaran.
                <br />
                    Tim Berners-Lee, Tejiendo la Web.
                </p>
            </blockquote>
        </Fragment>
    );
}

export default Blockquote;