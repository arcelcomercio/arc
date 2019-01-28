import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './breaking-news.css';

@Consumer
class BreakingNews extends Component {

    constructor(){
        super();
    }
    handleOnClick = () => {
        alert("holaa");
    }

    render() {
        // const content = this.props.globalContent;
        const { ButtonLavel, Title, SubTitle } = this.props.customFields;
        return (
            <div className="BreakingNews">
                <div className="box combine">
                    <button onClick={this.handleOnClick}>{ButtonLavel ? ButtonLavel : ""}</button>
                </div>
                <div className="box">
                    sdsfdsdfds
                    {Title && Title}
                    {/* Introduzca titulo aqui (2) */}
                </div>
                <div className="box">
                    {SubTitle&& SubTitle}
                    {/* Etiqueda (3) */}
                </div>
            </div>
        )
    }   
}
BreakingNews.propTypes = {
    customFields: PropTypes.shape({
        ButtonLavel: PropTypes.string,
        Title: PropTypes.string,
        SubTitle: PropTypes.string
    })
} 
export default BreakingNews
