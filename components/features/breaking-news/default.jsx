import Consumer from "fusion:consumer";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormatClassName } from '../../../resources/utilsJs/utilities'

const classes = FormatClassName({
  breakingnews: [
    'padding-normal'
  ],
  breakingnewsBtnClose: [
    'breaking-news__btn-close',
    'text-center'
  ],
  breakingnewsH2: [
    'breaking-news__h2'
  ],
  breakingnewsH2Tag: [
    'breaking-news__h2__tag'
  ],
  breakingnewsH2Link: [
    'breaking-news__h2__link'
  ],
})
@Consumer
class BreakingNews extends Component {
  constructor(props) {
    super(props);
    const { contentService, contentConfigValues } =
      this.props.customFields.articleConfig || {};

    this.state = {
      contentBreakingNews: "breaking-news"
    };
    if (contentService !== undefined && contentConfigValues !== undefined) {
      this.fetchContent({
        article: {
          source: contentService,
          query: contentConfigValues
        }
      });
    }
  }

  componentDidMount = () => {
    // let contentBreakingNews = "breaking-news";
    const { link } = this.props.customFields;
    let status = localStorage.getItem(link);
    if (status === "false") {
      this.setState({
        contentBreakingNews: "breaking-news hide"
      });
    }
  };

  handleOnclickClose = () => {
    const { link } = this.props.customFields;
    localStorage.setItem(link, "false");
    this.setState({
      contentBreakingNews: "breaking-news hide"
    });
  };

  render() {
    // const content = this.props.globalContent;
    // const content = this.state.article
    const { headlines, subheadlines } = this.state.article || {};
    const {
      backgroundColor,
      tags,
      title,
      subTitle,
      isExternalLink,
      link,
      articleConfig
    } = this.props.customFields;
    const webUrlService =
      articleConfig !== undefined &&
      articleConfig.contentConfigValues !== undefined
        ? articleConfig.contentConfigValues.website_url + '?_website='+this.props.arcSite
        : "";
    let objContent = {
      title: title || (headlines && headlines.basic),
      subTitle: subTitle || (subheadlines && subheadlines.basic),
      link: isExternalLink ? link : webUrlService
    };
    return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        <div className={
          `
          ${this.state.contentBreakingNews} 
          ${backgroundColor} 
          ${classes.breakingnews}
          `
        }>
          <span className={classes.breakingnewsBtnClose} onClick={this.handleOnclickClose}>x</span>
          <h2 className={classes.breakingnewsH2}>
              <span className={classes.breakingnewsH2Tag} {...this.props.editableField("tags")}>{tags}</span>
              <span {...this.props.editableField("title")}>
                  <a className={classes.breakingnewsH2Link} href={objContent.link} target="_blank">
                      {objContent.title}
                  </a>
              </span>
          </h2>
        </div>
    );
  }
}
BreakingNews.propTypes = {
  customFields: PropTypes.shape({
    backgroundColor: PropTypes.oneOf([
      "breaking-news--bgcolor-1",
      "breaking-news--bgcolor-2",
      "breaking-news--bgcolor-3",
      "breaking-news--bgcolor-4"
    ]).tag({
      name: "Color de fondo",
      labels: {
        "breaking-news--bgcolor-1": "Color 1",
        "breaking-news--bgcolor-2": "Color 2",
        "breaking-news--bgcolor-3": "Color 3",
        "breaking-news--bgcolor-4": "Color 4"
      },
      defaultValue: "breaking-news--bgcolor-1"
    }),
    tags: PropTypes.string.tag({ name: "Etiqueta" }),
    title: PropTypes.string.isRequired.tag({
      name: "Título",
      description: "Dejar vacio para que tome el título de la historia"
    }),
    subTitle: PropTypes.string.tag({ name: "Descripción", hidden: true }),
    articleConfig: PropTypes.contentConfig("story").tag({
      name: "Configuración de nota interna"
    }),
    isExternalLink: PropTypes.bool.tag({ name: "¿Nota externa?" }),
    link: PropTypes.string.tag({
      name: "Link externo",
      fieldType: "url"
    })
  })
};
export default BreakingNews;
