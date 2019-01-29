import Consumer from "fusion:consumer";
import React, { Component } from "react";
import PropTypes from "prop-types";

import "./breaking-news.css";

@Consumer
class BreakingNews extends Component {
    constructor() {
        super();
    }
    render() {
        // const content = this.props.globalContent;
        const { tags, title, link, subTitle } = this.props.customFields;
        let subtitulo = subTitle;
        debugger
        if(subtitulo.length > 29 ){
            subtitulo ="caracteres no validos";
        }
        
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
                            {title}
                        </h4>
                    </a>
                </div>
                <div className="box" {...this.props.editableField('subTitle')}>
                    <h5>
                    {subtitulo}
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
    })
};
export default BreakingNews;