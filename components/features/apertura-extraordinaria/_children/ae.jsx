import React, {Component} from 'react'
import Data from './data'
import { FormatClassName } from '../../../../resources/utilsJs/utilities'

const classes = FormatClassName({
    ae: [
        'ae',
        'padding-normal'
    ],
    aeSection: [
        'ae__section',
        'text-center'
    ],
    aeContent: [
        'ae__content'
    ],
    aeContentTitle: [
        'ae__content__title'
    ],
    aeContentSubtitle: [
        'ae__content__subtitle'
    ],
    aeContentAuthor: [
        'ae__content__author'
    ],
    aeMultimedia: [
        'ae__multimedia'
    ],
})

//@Consumer
class Ae extends Component {

    render () {
        const data = new Data(this.props.customFields, this.props.data, this.props.website)
         
        return  <div className={
                        `
                        ${classes.ae} 
                        ae--multimedia-${data.multimediaOrientation} 
                        text-${data.contentOrientation}
                        `
                    }>
                    <div className={classes.aeSection} {...this.props.editableField("section")}>
                        <a href={data.sectionLink}>{data.section}</a>
                    </div>
                    <div className={classes.aeContent}>
                        <div className={classes.aeContentTitle} {...this.props.editableField("title")}>
                            <a href={data.link}>{data.title}</a>
                        </div>
                        <div className={classes.aeContentSubtitle} {...this.props.editableField("subTitle")}>
                            <a href={data.link}>{data.subTitle}</a>
                        </div>
                        <div className={classes.aeContentAuthor}>{data.author}</div>
                    </div>
                    <div className={classes.aeMultimedia}>
                        <img src={data.image} alt={data.title}/>
                    </div>
                </div>
    }
}

export default Ae