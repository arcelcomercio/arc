import Consumer from "fusion:consumer";
import React, { Component } from "react";
import PropTypes from "prop-types";

<<<<<<< HEAD
import "./breaking-news.scss";

=======
>>>>>>> feature/layout_backend
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
        contentBreakingNews: "breaking-news bn-hidden"
      });
    }
  };

  handleOnclickClose = () => {
    const { link } = this.props.customFields;
    localStorage.setItem(link, "false");
    this.setState({
      contentBreakingNews: "breaking-news bn-hidden"
    });
  };

  render() {
    // const content = this.props.globalContent;
    // const content = this.state.article
    console.log("this.state.article", this.state.article);
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
        ? articleConfig.contentConfigValues.website_url
        : "";
    let objContent = {
      title: title || (headlines && headlines.basic),
      subTitle: subTitle || (subheadlines && subheadlines.basic),
      link: isExternalLink ? link : webUrlService
    };
    return (
        <div className={`${this.state.contentBreakingNews} ${backgroundColor}`}>
            <span className="bn-close" onClick={this.handleOnclickClose}>x</span>
            <h2>
                <span className="bn-tag" {...this.props.editableField("tags")}>{tags}</span>
                <span {...this.props.editableField("title")}>
                    <a href={objContent.link} target="_blank">
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
      "bn-color-1",
      "bn-color-2",
      "bn-color-3",
      "bn-color-4"
    ]).tag({
      name: "Color de fondo",
      labels: {
        "bn-color-1": "Color 1",
        "bn-color-2": "Color 2",
        "bn-color-3": "Color 3",
        "bn-color-4": "Color 4"
      },
      defaultValue: "bn-color-1"
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
