import React, {Component} from 'react'
import Data from './data'

class Tm extends Component
{
    render(){
        const data = new Data(this.props.customFields, this.props.state, this.props.website)

        return <div className='tm'>
            <article className={`tm__item tm__item--multimedia-${data.multimediaOrientation}`}>
                <div className='tm__item__title'>
                    <h2>
                        <a href={data.link1} {...this.props.editableField("title1")}>{data.title1}</a>
                    </h2>
                </div>
                <figure className='tm__item__multimedia'>
                    <a href={data.link1}><img src={data.image1}/></a>
                </figure>
                <div className='tm__item__author'>{data.author1}</div>
            </article>
            <article className={`tm__item tm__item--multimedia-${data.multimediaOrientation}`}>
                <div className='tm__item__title'>
                    <h2>
                        <a href={data.link2} {...this.props.editableField("title2")}>{data.title2}</a>
                    </h2>
                </div>
                <figure className='tm__item__multimedia'>
                    <a href={data.link2}><img src={data.image2}/></a>
                </figure>
                <div className='tm__item__author'>{data.author2}</div>
            </article>
            <article className={`tm__item tm__item--multimedia-${data.multimediaOrientation}`}>
                <div className='tm__item__title'>
                    <h2>
                        <a href={data.link3} {...this.props.editableField("title3")}>{data.title3}</a>
                    </h2>
                </div>
                <figure className='tm__item__multimedia'>
                    <a href={data.link3}><img src={data.image3}/></a>
                </figure>
                <div className='tm__item__author'>{data.author3}</div>
            </article>
        </div>
    }
}

export default Tm