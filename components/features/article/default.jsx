import React, { Component } from 'react';
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import { FormatClassName } from '../../../resources/utilsJs/utilities'

const classes = FormatClassName({
    article: [
        'flex',
        'flex--column',
        'article'
    ],
    articlePrincipal: [
        'flex',
        'flex--row',
        'article'
    ],
    articleFigure: [
        'article__figure'
    ],
    articleFigureImg: [
        'article__figure__img'
    ]
});
@Consumer
class Article extends Component {
    render() {
        return (
            <article className={ this.props.customFields.isPrincipal ? classes.articlePrincipal : classes.article }>
                <figure className={ classes.articleFigure }>
                    <img className={ classes.articleFigureImg } src="https://picsum.photos/400/300" alt=""/>
                </figure>
                <div>
                    <h1>Titulo principal de articulo</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, hic expedita dicta rem cumque blanditiis consequuntur vel aperiam officiis inventore rerum nobis autem libero quasi quo nihil sapiente iusto beatae!</p>
                </div>
            </article>
        )
    }
}

Article.propTypes = {
    customFields: PropTypes.shape({
        isPrincipal: PropTypes.bool
    })
}

export default Article;