import React, { Component } from 'react'
import Data from './data'

const classes = {
    aperturae: 'aperturae padding-normal',
    aperturaeSection: 'aperturae__section text-center',
    aperturaeContent: 'aperturae__content',
    aperturaeTitle: 'aperturae__title',
    aperturaeSubtitle: 'aperturae__subtitle' ,
    aperturaeAuthor: 'aperturae__author',
    aperturaeMultimedia: 'aperturae__multimedia'
}

//@Consumer
class AperturaExtraordinariaChildren extends Component {

    render () {
        const data = new Data(this.props.customFields, this.props.data, this.props.website)
         
        return  <div className={
                        `
                        ${classes.aperturae} 
                        aperturae--${data.multimediaOrientation} 
                        text-${data.contentOrientation}
                        `
                    }>
                    <div className={classes.aperturaeSection}>
                        <a href={data.sectionLink} {...this.props.editableField("section")}>{data.section}</a>
                    </div>
                    <div className={classes.aperturaeContent}>
                        <div className={classes.aperturaeTitle}>
                            <a href={data.link} {...this.props.editableField("title")}>{data.title}</a>
                        </div>
                        <div className={classes.aperturaeSubtitle}>
                            <a href={data.link} {...this.props.editableField("subTitle")}>{data.subTitle}</a>
                        </div>
                        <div className={classes.aperturaeAuthor}>{data.author}</div>
                    </div>
                    <div className={classes.aperturaeMultimedia}>
                        <img src={data.image} alt={data.title}/>
                    </div>
                </div>
    }
}

export default AperturaExtraordinariaChildren