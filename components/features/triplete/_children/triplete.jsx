import React, {Component} from 'react'
import Data from './data'

class TripleteChildren extends Component
{
    render(){
        const data = new Data(this.props.customFields, this.props.state, this.props.website)

        return <div className='triplete'> {[1,2,3].map(v => 
                <article className={`triplete__item triplete__item--multimedia-${data.multimediaOrientation}`}>
                    <div className='triplete__item__title'>
                        <h2>
                            <a href={data['link'+v]} {...this.props.editableField('title'+v)}>{data['title'+v]}</a>
                        </h2>
                    </div>
                    <figure className='triplete__item__multimedia'>
                        <a href={data['link'+v]}><img src={data['image'+v]}/></a>
                    </figure>
                    <div className='triplete__item__author'>{data['author'+v]}</div>
                </article>
            )}
        </div>
    }
}

export default TripleteChildren