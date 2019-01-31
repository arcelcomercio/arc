import Consumer from "fusion:consumer";
import React, { Component } from "react";
import PropTypes from "prop-types";

import "./breaking-news.css";

@Consumer
class BreakingNews extends Component {
  constructor(props) {
    super(props);
    const {
      contentService,
      contentConfigValues
    } = this.props.customFields.articleConfig;

    this.state = {
      contentBreakingNews: "content-BreakingNews"
    };
    this.fetchContent({
      article: {
        source: contentService,
        query: contentConfigValues
      }
    });
  }

  componentDidMount = () => {
      debugger
    // let contentBreakingNews = "content-BreakingNews";
    const { link } = this.props.customFields;
    let status = localStorage.getItem(link);
    debugger;

    if (status === "false") {
      this.setState({
        contentBreakingNews: "content-BreakingNews hidden"
      });
    }
  };

  handleOnclickClose = () => {
    const { link } = this.props.customFields;
    debugger
    localStorage.setItem(link, "false");
    this.setState({
      contentBreakingNews: "content-BreakingNews hidden"
    });
  };

  render() {
    // const content = this.props.globalContent;
    // const content = this.state.article
    console.log('this.state.article', this.state.article);
    const { headlines, subheadlines } = this.state.article || {};
    const { tags, title, subTitle, isExternalLink, link, articleConfig } = this.props.customFields;
    let objContent = {
      title: title || (headlines && headlines.basic),
      subTitle: subTitle || (subheadlines && subheadlines.basic)
    };
    return (
      <div className={this.state.contentBreakingNews}>
        <span className="close" onClick={this.handleOnclickClose}>
          x
        </span>
        <div className="BreakingNews">
          <div className="box combine" {...this.props.editableField("tags")}>
            <div className="lavel">
              <span>{tags.substr(0,13)}</span>
            </div>
          </div>
          <div className="box" {...this.props.editableField("title")}>
            <a href={isExternalLink ? link : articleConfig.contentConfigValues.website_url}>
              <h4>
                {objContent.title}
              </h4>
            </a>
          </div>
          <div className="box" {...this.props.editableField("subTitle")}>
            <h5>
              {objContent.subTitle && objContent.subTitle.substr(0,30)}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}
BreakingNews.propTypes = {
  customFields: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    isExternalLink: PropTypes.bool,
    link: PropTypes.string.isRequired,
    articleConfig: PropTypes.contentConfig("article")
  })
};
export default BreakingNews;
