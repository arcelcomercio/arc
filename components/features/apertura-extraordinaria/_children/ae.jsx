import React, {Component} from 'react'
import Data from './data'
//import Consumer from 'fusion:consumer'

//@Consumer
class Ae extends Component
{
    render () {
        const data = new Data(this.props.customFields, this.props.data, this.props.website)
        
        return <div className={`apertura-extraordinaria ae-multimedia-${data.multimediaOrientation}`}>
            <div className='ae-section' {...this.props.editableField("section")}>{data.section}</div>
            <div className='ae-content'>
                <div className='ae-title' {...this.props.editableField("title")}>
                    <a href={data.link}>{data.title}</a>
                </div>
                <div className='ae-subtitle' {...this.props.editableField("subTitle")}>{data.subTitle}</div>
                <div className='ae-author'>{data.author}</div>
            </div>
            <div className='ae-multimedia'>
                <img src={data.image} alt=""/>
            </div>
        </div>
    }
}

export default Ae