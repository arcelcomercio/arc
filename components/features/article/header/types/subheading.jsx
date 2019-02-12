import Consumer from "fusion:consumer";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

@Consumer
class Subheading extends Component {
    render() {
        const { subheadlines: subtitle } = this.props.globalContent;
        return (
            <Fragment>
                {subtitle &&
                    <h2 className='news-summary'> {subtitle.basic}</h2>}
            </Fragment>
        );
    }
}

Subheading.propTypes = {
    globalContent: PropTypes.object
};

export default Subheading;