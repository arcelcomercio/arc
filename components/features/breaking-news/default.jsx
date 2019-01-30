import Consumer from "fusion:consumer";
import React, { Component } from "react";
import PropTypes from "prop-types";

import "./breaking-news.css";

@Consumer
class BreakingNews extends Component {
    constructor(props) {
        super(props);
        const { contentService, contentConfigValues } = this.props.customFields.articleConfig
        this.fetchContent({
          article: {
            source: contentService,
            query: contentConfigValues
          }
        })
    }
    render() {
        // const content = this.props.globalContent;
        const content = this.state.article
        const { tags, title, link, subTitle } = this.props.customFields;
        return (
            <div className="BreakingNews">
                <div className="box combine" {...this.props.editableField('tags')}>
                    <div className="lavel">
                        <span>{tags}</span>
                    </div>

                </div>
                <div className="box" {...this.props.editableField('title')}>
                    <a href={link ? link : '#'} >
                        <h4>
                            {title || (content && content.headlines && content.headlines.basic)}
                        </h4>
                    </a>
                </div>
                <div className="box" {...this.props.editableField('subTitle')}>
                    <h5>
                    {subTitle || (content && content.subheadlines && content.subheadlines.basic)}
                    </h5>
                    
                </div>
            </div>
        );
    }
}
BreakingNews.propTypes = {
    customFields: PropTypes.shape({
        tags: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        subTitle: PropTypes.string.isRequired,
        articleConfig: PropTypes.contentConfig('article'),
    })
};
export default BreakingNews;