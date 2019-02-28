import React, {Component} from 'react'
import Data from './data'
import Icon from './icon'

class TripleteChildren extends Component
{
    render(){
        const data = new Data(this.props.customFields, this.props.state, this.props.website)
        return <div className='triplete'> {[1,2,3].map(index => 
                <article className={`triplete__item triplete__item--${data.multimediaOrientation}`}>
                    <div className='triplete__title'>
                        <h2>
                            <a href={data.getLink(index)} 
                            {...this.props.editableField('title'+index)}>
                                {data.getTitle(index)}
                            </a>
                        </h2>
                    </div>
                    <figure className='triplete__multimedia'>
                        <a href={data.getLink(index)}>
                            <img src={data.getMultimedia(index)}/>
                        </a>
                        <Icon iconClass={data.getIconClass(index)} iconOrientation={data.multimediaOrientation} />
                    </figure>
                    <div className='triplete__author'>
                        <a href={data.authorOrSectionLink(index)}>{data.authorOrSection(index)}</a>
                    </div>
                    
                </article>
            )}
        </div>
    }
}

export default TripleteChildren