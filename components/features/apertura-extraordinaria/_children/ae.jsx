import React, { Component } from 'react'
import Data from './data'
import { FormatClassName } from '../../../../resources/utilsJs/utilities'

const styles = FormatClassName({
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
                        ${styles.ae} 
                        ae--multimedia-${data.multimediaOrientation} 
                        text-${data.contentOrientation}
                        `
                    }>
                    <div className={styles.aeSection} {...this.props.editableField("section")}>
                        <a href={data.sectionLink}>{data.section}</a>
                    </div>
                    <div className={styles.aeContent}>
                        <div className={styles.aeContentTitle} {...this.props.editableField("title")}>
                            <a href={data.link}>{data.title}</a>
                        </div>
                        <div className={styles.aeContentSubtitle} {...this.props.editableField("subTitle")}>
                            <a href={data.link}>{data.subTitle}</a>
                        </div>
                        <div className={styles.aeContentAuthor}>{data.author}</div>
                    </div>
                    <div className={styles.aeMultimedia}>
                        <img src={data.image} alt={data.title}/>
                    </div>
                </div>
    }
}

export default Ae