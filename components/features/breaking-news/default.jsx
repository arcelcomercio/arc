import Consumer from "fusion:consumer";
import React, { Component } from "react";
import PropTypes from "prop-types";

@Consumer
class BreakingNews extends Component {
    constructor() {
        super();
    }
    render() {
        // const content = this.props.globalContent;
        const { tags, title, subTitle } = this.props.customFields;
        return (
            <div className="BreakingNews">
                <div className="box combine" {...this.props.editableField('tags')}>{tags}</div>
                <div className="box" {...this.props.editableField('title')}>
                    <a href={"https://www.google.com/"} >
                        {title}
                    </a>

                </div>
                <div className="box" {...this.props.editableField('subTitle')}>{subTitle}</div>
            </div>
        );
    }
}
BreakingNews.propTypes = {
    customFields: PropTypes.shape({
        tags: PropTypes.string,
        title: PropTypes.string,
        subTitle: PropTypes.string
    })
};
export default BreakingNews;