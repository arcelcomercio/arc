import React, {Component} from 'react'
import Data from './data'
import Icon from './icon'

class TripleteChildren extends Component
{
    render(){
        const data = new Data(this.props.customFields, this.props.state, this.props.website)
        //const iconHtml = data.getIconClass(index) != '' ? <span className='triplete__icon'><i className={`triplete__icon--${data.getIconClass(index)}`}></i></span>: ''
        return <div className='triplete'> {[1,2,3].map(index => 
                <article className={`triplete__item triplete__item--multimedia-${data.multimediaOrientation}`}>
                    <div className='triplete__item__title'>
                        <h2>
                            <a href={data.getLink(index)} 
                            {...this.props.editableField('title'+index)}>
                                {data.getTitle(index)}
                            </a>
                        </h2>
                    </div>
                    <figure className='triplete__item__multimedia'>
                        <a href={data.getLink(index)}>
                            <img src={data.getMultimedia(index)}/>
                        </a>
                    </figure>
                    <div className='triplete__item__author'>
                        <a href={data.authorOrSectionLink(index)}>{data.authorOrSection(index)}</a>
                    </div>
                    <Icon iconClass={data.getIconClass(index)} />
                </article>
            )}
        </div>
    }
}

export default TripleteChildren